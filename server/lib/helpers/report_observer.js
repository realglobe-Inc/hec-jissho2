const sugoObserver = require('sugo-observer')
const sugoCaller = require('sugo-caller')
const co = require('co')
const debug = require('debug')('hec:report-observer')
const formatter = require('@self/helper/formatter')
const models = require('@self/db/models')
const { Report, ReportInfo } = models
const REPORTER_MODULE = 'reporter'

/**
 * sugo-hub を監視して、 通報用 actor の接続を検出する。
 */
class ReportObserver {
  /**
   * options should have url information
   */
  constructor (options) {
    const s = this
    let {
      protocol,
      host
    } = options
    s.protocol = protocol
    s.host = host
    s.observer = sugoObserver(s._handler.bind(s), options)
    s.callers = {}
  }

  /**
   * 監視を開始する
   */
  start (options) {
    return this.observer.start()
  }

  /**
   * 監視を終了する
   */
  stop () {
    return this.observer.stop()
  }

  /**
   * observer に渡す関数
   */
  _handler ({data, event}) {
    const s = this
    return co(function * () {
      let actorKey = data.key
      // report actor のイベントでなければ無視する
      let isReport = event.startsWith('actor') && actorKey.startsWith('qq:')
      if (!isReport) {
        return
      }

      // 接続時
      if (event === 'actor:update' && data.spec.reporter) {
        // caller
        debug('Trying to connect caller: ', actorKey)
        let {protocol, host} = s
        console.log(protocol, host)
        let caller = sugoCaller({protocol, host})
        let actor = yield caller.connect(actorKey)
        let reporter = actor.get(REPORTER_MODULE)
        if (!reporter) {
          throw new Error('Cannot get an hitoe module.')
        }
        s.callers[actorKey] = actor
        // Add event listener
        // hitoe.on('warning', s._pushReportDb(actorKey)('warning'))
        let event = 'emergency'
        reporter.on(event, s._pushReportDb({actorKey, event}))
        reporter.on('error', (err) => { console.error(err) })
      }

      // 切断時
      // TODO ソケット切断後にタイムアウト切断
      if (event === 'actor:teardown') {
        let actor = s.callers[actorKey]
        if (!actor) {
          return
        }
        delete s.callers[actorKey]
        try {
          yield actor.disconnect(actorKey)
        } catch (e) {
          // エラーが出ても接続はちゃんと切れる
        }
      }
    }).catch((err) => console.error(err))
  }

  /**
   * 通報データをDBにつっこむ
   * はじめて通報が来たら Report にもつっこむ。
   * 毎回 ReportInfo につっこむ。
   */
  _pushReportDb ({actorKey, event}) {
    return (report) => co(function * () {
      let infoData = formatter.infoRawToDb({report, actorKey, event})
      debug('Observer recieve report', infoData)

      let { report_full_id } = infoData
      let found = yield Report.findOne({
        where: { report_full_id }
      })
      if (!found) {
        let actor_key = formatter.toActorKey(report_full_id)
        let report_id = formatter.toReportId(report_full_id)
        Report.create({
          report_full_id,
          actor_key,
          report_id,
          is_open: true,
          report_at: infoData.date
        })
      }

      yield ReportInfo.create(infoData)
    }).catch((err) => console.error(err))
  }
}

module.exports = ReportObserver

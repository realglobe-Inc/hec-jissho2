const camelcase = require('camelcase')
const snakecase = require('snake-case')

const camel = _translateCase('camel')
const snake = _translateCase('snake')

const formatter = {
  /**
   * 通報情報をフォーマットする
   */
  infoRawToDb ({report, actorKey, event}) {
    let [lat, lng] = report.location
    let {id: reportId, heartRate, date} = report
    let reportFullId = this.toReportFullId({actorKey, reportId})
    let data = snake({
      reportFullId,
      lat,
      lng,
      date,
      event,
      info: { heartRate }
    })
    return data
  },
  infoDbToUI (reportInfo) {
    let formatted = camel(reportInfo)
    for (let key of Object.keys(formatted)) {
      if (_isDate(key)) {
        formatted[key] = new Date(formatted[key])
      }
    }
    return formatted
  },
  // TODO あとで
  // infoRawToUI ({report, actorKey, event}) {
  //   return this.formatDbToUI(this.formatRawToDb({report, actorKey, event}))
  // },

  /**
  * データベース関係。 actorKey, reportId, reportFullId の三者変換
  */
  toReportFullId ({actorKey, reportId}) {
    return `${actorKey}#${reportId}`
  },
  toActorKey (reportFullId) {
    return reportFullId.split('#')[0]
  },
  toReportId (reportFullId) {
    return parseInt(reportFullId.split('#')[1], 10)
  }
}

/**
 * オブジェクトのキーを camelcase(or snakecase) に変換する
 */
function _translateCase (type) {
  return (obj) => {
    let translate = {
      snake: snakecase,
      camel: camelcase
    }[type]
    let res = {}
    let keys = Object.keys(obj)
    for (let key of keys) {
      res[translate(key)] = obj[key]
    }
    return res
  }
}

function _isDateKey (key) {
  return key === 'date' || key === 'createdAt' || key === 'updatedAt'
}

module.exports = formatter

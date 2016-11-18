const camelcase = require('camelcase')
const snakecase = require('snake-case')

const camel = _translateCase('camel')
const snake = _translateCase('snake')

const formatter = {
  /**
   * 通報詳細情報を生 -> DB用に変換する
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
  /**
   * 通報詳細情報をDB -> UI用に変換する
   */
  infoDbToUI (reportInfo) {
    return {
      reportFullId: reportInfo.report_full_id,
      location: {
        lat: reportInfo.lat,
        lng: reportInfo.lng
      },
      date: new Date(reportInfo.date),
      event: reportInfo.event,
      info: reportInfo.info
    }
  },

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

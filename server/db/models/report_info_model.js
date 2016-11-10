/**
 * 通報情報
 */
const Sequelize = require('sequelize')
const Model = require('./model')
const Report = require('./report_model')

const ReportInfo = Model('report_info', {
  /* 緯度 */
  lat: {
    type: Sequelize.DOUBLE(9, 6)
  },
  /* 経度 */
  lng: {
    type: Sequelize.DOUBLE(9, 6)
  },
  /* イベント名 warning | emergency */
  event: {
    type: Sequelize.STRING
  },
  /* 心拍数 */
  heart_rate: {
    type: Sequelize.INTEGER
  },
  /* 送られてきた時間 */
  sent_at: {
    type: Sequelize.DATE
  },
  /* 付加情報 */
  info: {
    type: Sequelize.JSON
  }
})

ReportInfo.belongsTo(Report)

module.exports = ReportInfo

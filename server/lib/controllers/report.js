/**
 * Controllers for report
 * @module reportController
 */

const co = require('co')
// const uuid = require('uuid')
const models = require('@self/db/models')
const compose = require('sg-server/lib/compose')

const {
  Report,
  ReportInfo
} = models

const reportController = {
  /** Open Reports */
  opening: {
    /**
     * Get all open reports
     */
    findAll (ctx) {
      return co(function * () {
        let openReports = yield Report.findAll({
          where: {
            is_open: true
          }
        })
        ctx.body = openReports.map(data => data.dataValues)
      })
    }
  },
  /** Close Reports */
  closing: {
    /**
     * Get all close reports
     */
    findAll (ctx) {
      return co(function * () {
        let closeRepots = yield Report.findAll({
          where: {
            is_open: false
          }
        })
        ctx.body = closeRepots.map(data => data.dataValues)
      })
    },
    /**
     * Close a report
     */
    closeOne (ctx) {

    }
  }
}

module.exports = reportController

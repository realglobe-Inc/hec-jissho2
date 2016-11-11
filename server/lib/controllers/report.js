/**
 * Controllers for report
 * @module reportController
 */

const co = require('co')
// const uuid = require('uuid')
const models = require('@self/db/models')
const compose = require('sg-server/lib/compose')
const schemaMW = require('../middlewares/schema_mw')
const debug = require('debug')('hec:controller:report')

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
    },

    findLatestInfo (ctx) {
      return co(function * () {
        let { report_full_id } = ctx.params
        let latest = yield ReportInfo.findOne({
          where: {
            report_full_id
          },
          order: 'sent_at'
        })
        ctx.body = latest.dataValues
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
    closeOne: compose([
      schemaMW({
        type: 'object',
        properties: {
          closed_date: {
            type: 'string'
          }
        },
        required: [
          'closed_date'
        ]
      }),
      (ctx) => {
        return co(function * () {
          let { report_full_id } = ctx.params
          let { closed_date } = ctx.request.body
          closed_date = new Date(closed_date)
          yield Report.update({
            is_open: false,
            closed_date
          }, {
            where: report_full_id
          })
          ctx.body = {
            success: true
          }
        })
      }
    ])
  }
}

module.exports = reportController

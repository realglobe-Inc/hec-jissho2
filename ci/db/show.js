#!/usr/bin/env node
/**
 * Show Datebase data
 */

const co = require('co')
const ReportModel = require('../db/report_model')
const OpenReportModel = require('../db/open_report_model')
const ClosedReportModel = require('../db/closed_report_model')

co(function * () {
  let Report = ReportModel()
  let reports = yield Report.findAll()
  console.log('--- report ----')
  console.log(reports.map((data) => data.dataValues))

  let OpenReport = OpenReportModel()
  let opens = yield OpenReport.findAll()
  console.log('\n--- open report ---')
  console.log(opens.map((data) => data.dataValues))

  let ClosedReport = ClosedReportModel()
  let closed = yield ClosedReport.findAll()
  console.log('\n--- closed report ---')
  console.log(closed.map((data) => data.dataValues))
}).catch((err) => { console.error(err) })

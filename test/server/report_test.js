/**
 * Test case for report server.
 * Runs with mocha.
 */
'use strict'

const assert = require('assert')
const co = require('co')
const arequest = require('arequest')
const reportServer = require('../../server/lib/report_server')
const aport = require('aport')
const asleep = require('asleep')
const db = require('../../server/db')
const reportUrl = require('../../server/helper/urls').report
const sugoCaller = require('sugo-caller')
const sugoActor = require('sugo-actor')
const { Module } = sugoActor

describe('Report server', function () {
  let request = arequest.create({ jar: true })
  this.timeout(10000)
  let restPort
  let observer
  let baseUrl

  before(() => co(function * () {
    yield db.sync({ force: true })
    yield db.seed()
    restPort = yield aport()
    baseUrl = `http://localhost:${restPort}`
    yield reportServer.listen(restPort)
    observer = reportServer.createObserver({
      protocol: 'http',
      host: `localhost:${restPort}`
    })
    yield observer.start()
  }))

  after(() => co(function * () {
    if (observer) {
      yield observer.stop()
    }
    yield reportServer.close()
    yield db.drop()
  }))

  it('Api request', () => co(function * () {
    let report_full_id
    // Get open reports
    {
      let url = `${baseUrl}${reportUrl.getOpenReports()}`
      let { statusCode, body } = yield request({
        url,
        method: 'GET',
        json: true
      })
      assert.ok(body.length > 0)
      assert.equal(statusCode, 200)
      report_full_id = body[0].report_full_id
    }
    // Get report info
    {
      let url = `${baseUrl}${reportUrl.getReportInfo(report_full_id)}`
      let { statusCode, body } = yield request({
        url,
        method: 'GET',
        json: true
      })
      assert.equal(body.report_full_id, report_full_id)
      assert.equal(statusCode, 200)
    }
    // Close report
    {
      let url = `${baseUrl}${reportUrl.closeReport(report_full_id)}`
      let { statusCode, body } = yield request({
        url,
        method: 'POST',
        json: true,
        body: {
          closed_date: new Date()
        }
      })
      assert.ok(body.success)
      assert.equal(statusCode, 200)
    }
    // Get closed report
    {
      let url = `${baseUrl}${reportUrl.getClosedReports()}`
      let { statusCode, body } = yield request({
        url,
        method: 'GET',
        json: true
      })
      assert.equal(statusCode, 200)
      assert.ok(body.find(report => report.report_full_id === report_full_id))
    }
  }))

  it('Observer', () => co(function * () {
    let reportId = 1
    let actorKey = 'qq:reporter:99'
    let reportFullId = `${actorKey}#${reportId}`
    // Actor connection
    let reporter = new Module({
      report () {
        this.emit('emergency', {
          id: reportId,
          heartRate: 40,
          location: [1, 2, 3],
          date: (new Date()).toString()
        })
      }
    })
    let actor = sugoActor({
      port: restPort,
      key: actorKey,
      modules: {
        reporter
      }
    })
    yield actor.connect()

    // Connect master actor
    let caller = sugoCaller({
      protocol: 'http',
      host: `localhost:${restPort}`
    })
    let masterActor = yield caller.connect('qq:master-reporter')
    let masterReporter = masterActor.get('master-reporter')
    let gotReport = null
    masterReporter.on('emergency', (data) => {
      gotReport = data
    })
    assert.ok(masterReporter)

    // Emit report
    yield asleep(1000)
    reporter.report()
    yield asleep(2000)
    let { body: reports } = yield request({
      url: `${baseUrl}${reportUrl.getOpenReports()}`,
      method: 'GET',
      json: true
    })
    assert.ok(reports.find((report) => report.report_full_id === reportFullId))

    let url = `${baseUrl}${reportUrl.getReportInfo(reportFullId)}`
    let { body: reportInfo } = yield request({
      url,
      method: 'GET',
      json: true
    })
    assert.equal(reportInfo.report_full_id, reportFullId)
    assert.equal(gotReport.report_full_id, reportFullId)

    yield masterActor.disconnect()
    yield actor.disconnect()
  }))
})

/* global describe, before, after, it */

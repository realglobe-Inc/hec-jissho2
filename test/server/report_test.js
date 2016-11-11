/**
 * Test case for report server.
 * Runs with mocha.
 */
'use strict'

const assert = require('assert')
const co = require('co')
const arequest = require('arequest')
const reportServer = require('../../server/lib/report_server')
const fs = require('fs')
const aport = require('aport')
const db = require('../../server/db')
const reportUrl = require('../../server/helper/urls').report

describe('Report server', function () {
  let request = arequest.create({ jar: true })
  this.timeout(10000)
  let restPort
  before(() => co(function * () {
    yield db.sync({ force: true })
    yield db.seed()
    restPort = yield aport()
    yield reportServer.listen({ port: restPort })
  }))

  after(() => co(function * () {
    yield reportServer.close()
    yield db.drop()
  }))

  it('Api request', () => co(function * () {
    let baseUrl = `http://localhost:${restPort}`
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
})

/* global describe, before, after, it */

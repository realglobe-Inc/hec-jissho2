#!/usr/bin/env node

process.env.NODE_ENV = 'development'
process.env.DEBUG = 'sg:*,hec:*'

const { port } = require('@self/server/env')
const ui = require('@self/server/lib/ui_server')
const camera = require('@self/server/lib/camera_server')
const report = require('@self/server/lib/report_server')
const proxy = require('../ci/dev/proxy_server')
const dev = require('../ci/dev/dev_server')
const co = require('co')
const debug = require('debug')('hec:dev')

co(function * () {
  // UI
  yield ui.listen(port.UI)
  debug(`UI server listening on port ${port.UI}`)

  // Camera
  yield camera.listen(port.CAMERA)
  debug(`Camera server listening on port ${port.CAMERA}`)

  // Report
  yield report.listen(port.REPORT)
  debug(`Report server listening on port ${port.REPORT}`)
  let observer = report.createObserver()
  yield observer.start()

  // Proxy
  yield proxy.listen(port.PROXY)
  debug(`Proxy server listening on port ${port.PROXY}`)

  // Dev
  yield dev.listen(port.DEV)
  debug(`Dev server listening on port ${port.DEV}`)
})

#!/usr/bin/env node

const { port } = require('@self/server/env')
const ui = require('@self/server/lib/ui_server')
const camera = require('@self/server/lib/camera_server')
const report = require('@self/server/lib/report_server')
const PubPhoto = require('@self/server/lib/pub_photo_server')
const co = require('co')
const debug = require('debug')('hec:app')

function app () {
  return co(function * () {
    // UI
    yield ui.listen(port.UI)
    debug(`UI server listening on port ${port.UI}`)

    // Camera
    yield camera.listen(port.CAMERA)
    debug(`Camera server listening on port ${port.CAMERA}`)
    let monitorActor = camera.photoMonitorActor()
    yield monitorActor.connect()

    // Report
    yield report.listen(port.REPORT)
    debug(`Report server listening on port ${port.REPORT}`)
    let observer = report.createObserver()
    yield observer.start()

    // PubPhoto
    yield PubPhoto.listen(port.PUB_PHOTO)
    debug(`PubPhoto server listening on port ${port.PUB_PHOTO}`)
    yield PubPhoto.actor.connect()
    
  }).catch((err) => console.error(err))
}

module.exports = app

if (!module.parent) {
  app()
}

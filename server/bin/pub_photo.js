#!/usr/bin/env node
const { port } = require('../env')
const pubPhotoServer = require('../lib/pub_photo_server')
const co = require('co')

co(function * () {
  yield pubPhotoServer.listen(port.PUB_PHOTO)
  console.log(`PUB_PHOTO server listening on port ${port.PUB_PHOTO}`)

  yield pubPhotoServer.actor.connect()
})

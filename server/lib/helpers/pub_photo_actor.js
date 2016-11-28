const sugoActor = require('sugo-actor')
const { Module } = sugoActor
const { SUGOS, SUGOS_URL } = require('../consts')
const { port } = require('@self/env')

const debug = require('debug')('hec:pubPhotoActor')

function pubPhotoActor () {
  let emitter = new Module({})
  let actor = sugoActor({
    key: SUGOS.PUB_PHOTO_ACTOR.KEY,
    modules: {
      [SUGOS.PUB_PHOTO_ACTOR.MODULE]: emitter
    },
    protocol: 'http',
    hostname: 'localhost',
    port: port.PUB_PHOTO,
    path: SUGOS_URL.PUB_PHOTO_PATH
  })
  Object.assign(actor, {
    emitter
  })
  return actor
}

module.exports = pubPhotoActor()

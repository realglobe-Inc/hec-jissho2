/**
 * SUGO-Hub Server to publish a photo selected by Center.
 */
const sugoHub = require('sugo-hub')
const pubPhotoActor = require('./helpers/pub_photo_actor')
const env = require('@self/env')
const { join } = require('path')
const { REST_URL, SUGOS_URL, SUGOS } = require('./consts')
const debug = require('debug')('hec:pub_photo_server')

let isTest = process.env.NODE_ENV === 'test'

// DB ではなくサーバーが保持
let selectedPhoto = {}

let config = {
  endpoints: {
    /** 配信する写真を選択する */
    [REST_URL.OF_PUB_PHOTO.SELECT_PHOTO]: {
      GET: (ctx) => {
        ctx.body = selectedPhoto
      },
      POST: (ctx) => {
        let selected = ctx.request.body
        debug(selected)
        selectedPhoto = selected
        pubPhotoActor.emitter.emit(SUGOS.PUB_PHOTO_ACTOR.UPDATE_PHOTO_EVENT, selected)
        ctx.body = { success: true }
      }
    }
  },
  storage: isTest ? null : {
    redis: {
      url: env.redis.URL,
      db: 1
    }
  },
  socketIoOptions: {
    path: SUGOS_URL.PUB_PHOTO_PATH
  }
}

const pubPhotoServer = sugoHub(config)

pubPhotoServer.actor = pubPhotoActor

module.exports = pubPhotoServer

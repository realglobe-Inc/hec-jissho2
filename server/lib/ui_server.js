/**
 * SUGO-Hub Server to manage UI
 */
const sugoHub = require('sugo-hub')
const env = require('@self/env')
const { join } = require('path')
const { SUGOS_URL } = require('./consts')

let isTest = process.env.NODE_ENV === 'test'

let centerLocation = {
  lat: 35.701562,
  lng: 139.753148
}

let config = {
  endpoints: {
    /** 本部の位置 */
    '/center': {
      GET: (ctx) => {
        ctx.body = centerLocation
      },
      POST: (ctx) => {
        let location = ctx.request.body
        centerLocation = location
        ctx.body = {
          success: true
        }
      }
    }
  },
  public: [ join(__dirname, '../public') ],
  storage: isTest ? null : {
    redis: {
      url: env.redis.URL,
      db: 1
    }
  },
  socketIoOptions: {
    path: SUGOS_URL.UI_PATH
  }
}

const uiServer = sugoHub(config)

module.exports = uiServer

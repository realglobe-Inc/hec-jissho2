/**
 * SUGO-Hub Server to manage UI
 */
const sugoHub = require('sugo-hub')
const env = require('@self/env')
// const endpoints = require('./endpoints/ui')
const endpoints = {}
const { join } = require('path')

let isTest = process.env.NODE_ENV === 'test'

let config = {
  endpoints,
  public: [ join(__dirname, '../public') ],
  storage: isTest ? null : {
    redis: {
      url: env.redis.URL,
      db: 1
    }
  }
}

const uiServer = sugoHub(config)

module.exports = uiServer

/**
 * SUGO-Hub Server to manage reports
 */
const sugoHub = require('sugo-hub')
const env = require('@self/env')
const endpoints = require('./report/endpoints')
const { observer } = require('./report/helpers/observer')

let reportServer = sugoHub({
  endpoints,
  storage: {
    redis: {
      url: env.redis.URL,
      db: 1
    }
  }
})

Object.assign(reportServer, {
  observer
})

module.exports = reportServer

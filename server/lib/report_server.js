/**
 * SUGO-Hub Server to manage reports
 */
const sugoHub = require('sugo-hub')
const env = require('@self/env')
const endpoints = require('./endpoints/report')
// const { observer } = require('./helpers/observer')
const observer = () => {}

let config = {
  endpoints
}

if (process.env.NODE_ENV !== 'test') {
  Object.assign(config, {
    storage: {
      redis: {
        url: env.redis.URL,
        db: 1
      }
    }
  })
}

let reportServer = sugoHub(config)

Object.assign(reportServer, {
  observer
})

module.exports = reportServer

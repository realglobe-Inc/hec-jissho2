/**
 * SUGO-Hub Server to manage reports
 */
const sugoHub = require('sugo-hub')
const env = require('@self/env')
const endpoints = require('./endpoints/report')
const Observer = require('./helpers/report_observer')

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
  createObserver () {
    let { port } = this
    if (typeof port !== 'number') {
      throw new Error(`Port given to Report observer is ${port}`)
    }
    return new Observer({
      protocol: 'http',
      host: `localhost:${port}`
    })
  }
})

module.exports = reportServer

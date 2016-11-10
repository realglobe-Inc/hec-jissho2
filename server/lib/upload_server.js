/**
 * Rest server to uploade images
 */
'use strict'

const sgServer = require('sg-server')
const endpoints = require('./upload/endpoints')

let uploadServer = sgServer({ endpoints })

module.exports = uploadServer

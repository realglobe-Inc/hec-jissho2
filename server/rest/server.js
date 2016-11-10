/**
 * Rest server
 */
'use strict'

const sgServer = require('sg-server')
const endpoints = require('./endpoints')

let server = sgServer({ endpoints })

module.exports = server

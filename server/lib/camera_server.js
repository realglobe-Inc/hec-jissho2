/**
 * Rest server to uploade images
 */
'use strict'

const sgServer = require('sg-server')
const endpoints = require('./endpoints/camera')

let cameraServer = sgServer({ endpoints })

module.exports = cameraServer

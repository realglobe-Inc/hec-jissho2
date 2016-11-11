#!/usr/bin/env node
const { port } = require('../env')
const cameraServer = require('../lib/camera_server')

cameraServer
  .listen(port.CAMERA)
  .then(() => {
    console.log(`CAMERA server started at port ${port.CAMERA}`)
  })

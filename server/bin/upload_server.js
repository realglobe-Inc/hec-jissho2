#!/usr/bin/env node
const { port } = require('../env')
const uploadServer = require('../lib/upload_server')

uploadServer
  .listen(port.REST)
  .then(() => {
    console.log(`REST server started at port ${port.REST}`)
  })

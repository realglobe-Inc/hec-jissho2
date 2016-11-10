#!/usr/bin/env node
const { port } = require('../env')
const restServer = require('../rest/server')

restServer
  .listen(port.REST)
  .then(() => {
    console.log(`REST server started at port ${port.REST}`)
  })

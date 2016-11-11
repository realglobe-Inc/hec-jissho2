#!/usr/bin/env node
const { port } = require('../env')
const reportServer = require('../lib/report_server')

reportServer
  .listen(port.REPORT)
  .then(() => {
    console.log(`REPORT server listening on port ${port.REPORT}`)
  })

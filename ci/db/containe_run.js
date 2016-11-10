#!/usr/bin/env node
/**
 * Run MySQL Docker container
 */
'use strict'

process.chdir(__dirname + '/../..')

const { mysql } = require('ci-docker-commands')

function run () {
  const { ROOT_PASSWORD } = require('../../env').database

  let { ip, port } = mysql.runMysql({
    database: 'db',
    rootPassword: ROOT_PASSWORD
  })

  console.log(`Your database is ready! ${JSON.stringify({ ip, port })}`)
}

module.exports = run

if (!module.parent) {
  run()
}


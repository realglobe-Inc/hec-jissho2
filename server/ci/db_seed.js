#!/usr/bin/env node
/**
 * Seed Datebase
 */

const NODE_ENV = process.env.NODE_ENV || 'development'

const co = require('co')
const models = require('../db/models')
const fs = require('fs')
const promisify = require('es6-promisify')
const readdir = promisify(fs.readdir)
const sync = require('./db_sync')
const drop = require('./db_drop')

function seed () {
  return co(function * () {
    process.chdir(__dirname + '/..')
    let seedDir = `db/seeds/${NODE_ENV}`
    let seedFiles = yield readdir(seedDir)
    let seedPaths = seedFiles.map((file) => '../' + seedDir + '/' + file)
    for (let path of seedPaths) {
      let {model: name, seed} = require(path)
      let Model = models[name]
      for (let data of seed) {
        yield Model.create(data)
      }
      console.log(`${name} seeded.`)
    }
  }).catch((err) => { console.error(err) })
}

module.exports = seed

if (!module.parent) {
  co(function * () {
    yield drop()
    yield sync()
    yield seed()
  })
}

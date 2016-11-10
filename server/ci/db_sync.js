#!/usr/bin/env node
/**
 * Sync Datebase
 */

const co = require('co')
const models = require('../db/models')

function sync () {
  return co(function * () {
    let modelList = Object.keys(models).map((name) => models[name])
    for (let model of modelList) {
      yield model.sync()
      console.log(`${model.name} created.`)
    }
  }).catch((err) => { console.error(err) })
}

module.exports = sync

if (!module.parent) {
  sync()
}

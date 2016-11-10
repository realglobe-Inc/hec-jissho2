#!/usr/bin/env node
/**
 * Drop all tables
 */

const co = require('co')
const models = require('../db/models')

function drop () {
  return co(function * () {
    // 順番が大事
    let modelList = [
      'Photo',
      'Camera',
      'User'
    ]
    for (let name of modelList) {
      let model = models[name]
      yield model.drop()
      console.log(`${model.name} dropped.`)
    }
  }).catch((err) => { console.error(err) })
}

module.exports = drop

if (!module.parent) {
  drop()
}

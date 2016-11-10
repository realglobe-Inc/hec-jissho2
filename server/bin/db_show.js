#!/usr/bin/env node
/**
 * Show Datebase
 */

const co = require('co')
const models = require('../db/models')
const colors = require('colors')

function show () {
  return co(function * () {
    let modelList = Object.keys(models).map((name) => models[name])
    for (let model of modelList) {
      let all = yield model.findAll()
      console.log(colors.green(`--- ${model.name} ---`))
      console.log(all.map((data) => data.dataValues))
      console.log('')
    }
  }).catch((err) => { console.error(err) })
}

module.exports = show

if (!module.parent) {
  show()
}

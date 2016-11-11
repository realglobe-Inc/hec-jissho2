#!/usr/bin/env node

const co = require('co')
const { exec } = require('child_process')
const { readdir } = require('fs')
const mkdirp = require('mkdirp')
const promisify = require('es6-promisify')

const mkdirpAsync = promisify(mkdirp)
const execAsync = promisify(exec)
const readdirAsync = promisify(readdir)

process.chdir(__dirname + '/..')

co(function * () {
  // Make simbolic link of this project at node_modules/@self
  let selfPath = 'node_modules/@self'
  yield mkdirpAsync(selfPath)
  let dirs = [
    'db',
    'env',
    'helper',
    'lib'
  ]
  let existing = yield readdirAsync(selfPath)
  for (let dir of dirs) {
    if (!existing.includes(dir)) {
      yield execAsync(`ln -s $PWD/${dir} $PWD/${selfPath}/`)
    }
  }
}).catch(err => console.error(err))

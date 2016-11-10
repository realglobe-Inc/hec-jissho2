/**
 * @function savePhotoImage
 */
'use strict'

const env = require('../../../env')
const { PHOTO_DIR, PUBLIC_DIR } = env.paths
const fs = require('fs')
const path = require('path')
const co = require('co')
const mkdirp = require('mkdirp')
const promisify = require('es6-promisify')
const mkdirpAsync = promisify(mkdirp)

/** @lends savePhotoImage */
function savePhotoImage (camera, photo, stream, options = {}) {
  return co(function * () {
    let filename = path.join(
        PHOTO_DIR, camera.uuid, photo.uuid
      ) + options.extension
    yield mkdirpAsync(path.dirname(filename))
    let write = fs.createWriteStream(filename)
    stream.pipe(write)
    yield new Promise((resolve, reject) => {
      write
        .on('close', () => resolve())
        .on('error', (err) => reject(err))
    })
    return '/' + path.relative(PUBLIC_DIR, filename)
  })
}

module.exports = savePhotoImage

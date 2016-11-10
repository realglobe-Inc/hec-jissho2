/**
 * @function savePhotoImage
 */
'use strict'

const { mkdirpAsync } = require('asfs')
const { env } = require('apeman').ctx(__dirname)
const { PHOTO_DIR, PUBLIC_DIR } = env.paths
const fs = require('fs')
const path = require('path')
const co = require('co')

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

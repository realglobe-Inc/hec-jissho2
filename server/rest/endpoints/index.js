/**
 * @module endpoints
 */
'use strict'

const cameraEndpoint = require('./camera_endpoint')

module.exports = {
  '/rest/cameras': {
    POST: cameraEndpoint.create
  },
  '/rest/cameras/:camera_uuid': {
    GET: cameraEndpoint.one,
    DELETE: cameraEndpoint.destroy
  },
  '/rest/cameras/:camera_uuid/photos': {
    POST: cameraEndpoint.photo.create
  },
  '/rest/cameras/:camera_uuid/photos/:photo_uuid': {
    GET: cameraEndpoint.photo.one,
    DELETE: cameraEndpoint.photo.destroy
  }
}

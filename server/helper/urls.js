/**
 * urls of entrypoints
 */
const { REST_URL } = require('@self/lib/consts')
const CAMERA_URL = REST_URL.OF_CAMERA
const REPORT_URL = REST_URL.OF_REPORT

function replace (target, opt) {
  let keys = Object.keys(opt)
  let replaced = target
  for (let key of keys) {
    replaced = replaced.replace(`:${key}`, opt[key])
  }
  return replaced
}

const urls = {
  /**
   * URL of camera server
   */
  camera: {
    createCamera () {
      return CAMERA_URL.CAMERAS
    },
    getCamera (camera_uuid) {
      return replace(CAMERA_URL.CAMERA, { camera_uuid })
    },
    deleteCamera (camera_uuid) {
      return replace(CAMERA_URL.CAMERA, { camera_uuid })
    },
    createPhoto (camera_uuid) {
      return replace(CAMERA_URL.PHOTOS, { camera_uuid })
    },
    getPhoto (camera_uuid, photo_uuid) {
      return replace(CAMERA_URL.PHOTO, { camera_uuid, photo_uuid })
    },
    deletePhoto (camera_uuid, photo_uuid) {
      return replace(CAMERA_URL.PHOTO, { camera_uuid, photo_uuid })
    }
  },

  /**
   * URL of report server
   */
  report: {
    getOpenReports () {
      return REPORT_URL.OPEN_REPORTS
    },
    getReportInfo (report_full_id) {
      return replace(REPORT_URL.OPEN_REPORT, { report_full_id })
    },
    getClosedReports () {
      return REPORT_URL.CLOSE_REPORTS
    },
    closeReport (report_full_id) {
      return replace(REPORT_URL.CLOSE_REPORT, { report_full_id })
    }
  }
}

module.exports = urls

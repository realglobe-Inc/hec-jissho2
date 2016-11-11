module.exports = {
  REST_URL: {
    OF_CAMERA: {
      CAMERAS: '/rest/cameras',
      CAMERA : '/rest/cameras/:camera_uuid',
      PHOTOS : '/rest/cameras/:camera_uuid/photos',
      PHOTO  : '/rest/cameras/:camera_uuid/photos/:photo_uuid'
    },

    OF_REPORT: {
      // REPORTS      : '/rest/reports',
      OPEN_REPORTS : '/rest/reports/open',
      OPEN_REPORT  : '/rest/reports/open/:report_full_id',
      CLOSE_REPORTS: '/rest/reports/close',
      CLOSE_REPORT : '/rest/reports/close/:report_full_id'
    }
  }
}

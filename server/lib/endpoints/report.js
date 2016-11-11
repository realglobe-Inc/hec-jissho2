/**
 * @module endpoints
 */
const { REST_URL } = require('@self/lib/consts')
const URL = REST_URL.OF_REPORT
const controller = require('../controllers/report')

module.exports = {
  [URL.OPEN_REPORTS]: {
    GET: controller.opening.findAll
  },
  [URL.OPEN_REPORT]: {
    GET: controller.opening.findLatestInfo
  },
  [URL.CLOSE_REPORTS]: {
    GET: controller.closing.findAll
  },
  [URL.CLOSE_REPORT]: {
    POST: controller.closing.closeOne
  }
}

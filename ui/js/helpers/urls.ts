import { Location } from '../interfaces/app'

const restUrls = require('@self/server/helper/urls')
const camera = require('@self/server/env/camera.json').default
const { apiKey: googleMapApiKey } = require('@self/ui/config')
let { protocol, host } = window.location
const ORIGIN_URL = `${protocol}//${host}/jissho2`

export default {
  protocol () {
    return protocol
  },
  host () {
    return host
  },
  origin () {
    return ORIGIN_URL
  },
  /**
   * クローズされていない通報情報
   */
  openReports () {
    return ORIGIN_URL + restUrls.report.getOpenReports()
  },
  /**
   * クローズされた通報情報
   */
  closedReports () {
    return ORIGIN_URL + restUrls.report.getClosedReports()
  },
  /**
   * 通報をクローズする
   */
  closeReport (reportFullId: string) {
    return ORIGIN_URL + restUrls.report.closeReport(reportFullId)
  },
  /**
   * 本部の位置情報
   */
  centerLocation () {
    // TODO 未実装
    return ORIGIN_URL + '/center'
  },
  /**
   * SUGO Caller
   */
  callers () {
    return {
      protocol,
      host,
      path: '/jissho2/socket.io'
    }
  },
  /**
   * Google geocode API (reverse)
   */
  geocode ({lat, lng}: Location) {
    return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapApiKey}&language=ja`
  },
  /**
   * 写真のイメージデータ
   */
  getPhoto (photoUrl): string {
    if (photoUrl) {
      return ORIGIN_URL + photoUrl + `?token=${camera.token}`
    } else {
      return ''
    }
  },
  /**
   * 写真のリスト
   */
  getPhotoList () : string {
    return ORIGIN_URL + restUrls.camera.getPhotoList(camera.uuid) + `?token=${camera.token}`
  }
}

import { Location } from '../interfaces/app'

const restUrls = require('@self/server/helper/urls')
const { SUGOS_URL } = require('@self/server/lib/consts')
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
   * SUGO Caller of UI server
   */
  uiCallers () {
    return {
      protocol,
      host,
      path: '/jissho2' + SUGOS_URL.UI_PATH
    }
  },
  /**
   * SUGO Caller of PubPhoto server
   */
  pubPhotoCallers () {
    return {
      protocol,
      host,
      path: '/jissho2' + SUGOS_URL.PUB_PHOTO_PATH
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
  getPhoto (photoUrl, size: {width?: number, height?: number} = {}): string {
    if (photoUrl) {
      let sizeToken = ''
      if (size.width) {
        sizeToken += `&width=${size.width}`
      }
      if (size.height) {
        sizeToken += `&height=${size.height}`
      }
      return ORIGIN_URL + photoUrl + `?token=${camera.token}` + sizeToken
    } else {
      return ''
    }
  },
  /**
   * 写真のリスト
   */
  getPhotoList () : string {
    return ORIGIN_URL + restUrls.camera.getPhotoList(camera.uuid) + `?token=${camera.token}`
  },
  /**
   * 写真を共有
   */
  sharePhoto (): string {
    return ORIGIN_URL + restUrls.pubPhoto.selectPhoto()
  }
}

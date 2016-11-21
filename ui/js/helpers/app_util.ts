/**
 * Application util functions
 */
import co from 'co'
import * as bRequest from 'browser-request'
import urls from './urls'
import { PhotoInfo } from '../interfaces/app'

const debug = require('debug')('hec:app_util')

export default {
  /**
   * Date のインスタンスをいい感じにフォーマットした文字列にして返す
   */
  formatTime (date: Date | string, option = { type: 'simple' }) {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    let padding = number => ('0' + number).slice(-2)
    let hours = padding(date.getHours())
    let minutes = padding(date.getMinutes())
    let seconds = padding(date.getSeconds())
    switch (option.type) {
      case 'jp':
        return `${hours}時 ${minutes}分 ${seconds}秒`
      case 'full_jp':
        return `${date.getMonth() + 1}月${date.getDate()}日 ${hours}時${minutes}分${seconds}秒`
      case 'simple':
        return `${hours}:${minutes}:${seconds}`
    }
  },
  /**
   * 自分の位置情報を {lat, lng} で取得する
   */
  getMyLocation () {
    return co(function * () {
      if (!navigator.geolocation) {
        throw new Error('Not found navigator.geolocation')
      }
      let location: Location = yield new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          ({coords}) => {
            let location = {
              lat: coords.latitude,
              lng: coords.longitude
            }
            debug(location)
            resolve(location)
          },
          (err) => {
            reject(err)
          }, {
            enableHighAccuracy: true,
            timeout: 10000
          }
        )
      })
      return location
    })
  },
  /**
   * 写真の情報リストを取ってくる
   */
  fetchPhotoList () {
    return new Promise((resolve, reject) => {
      bRequest({
        url: urls.getPhotoList(),
        method: 'GET',
        json: true
      }, (err, res, list: PhotoInfo[]) => {
        err ? reject(err) : resolve(list)
      })
    })
  }
  // /**
  //  * 緯度経度から住所を取得する
  //  */
  // getAddress ({lat, lng}) {
  //   return co(function * () {
  //     let body = yield request({
  //       method: 'GET',
  //       url: urls.geocode({lat, lng}),
  //       json: true
  //     })
  //     // Like this, '日本, 〒101-0061 東京都千代田区三崎町２丁目２０−４ 八木ビル'
  //     // Format '千代田区三崎町２丁目２０−４'
  //     let fullAddress = body.results[0].formatted_address
  //     let address = fullAddress.split(' ')[2].replace(/.+?[県都府道]/, '')
  //     return address
  //   })
  // }
}

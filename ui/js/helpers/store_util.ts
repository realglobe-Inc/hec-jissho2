import assert from 'assert'
import Store from '../interfaces/store'
import { Marker, Report, Location } from '../interfaces/app'
import appUtil from './app_util'
import actions from '../actions'
import urls from './urls'
import * as bRequest from 'browser-request'

const formatter = require('@self/server/helper/formatter')
const debug = require('debug')('hec:store_util')

/**
 * 選択されているマーカーを取得
 */
export function getSelectedMarker (state: Store.State): Marker | null {
  let { markers, selectedMarker } = state
  let { id } = selectedMarker
  let marker = markers.get(id)
  return marker || null
}

/**
 * 新しいマーカーIDを発行する
 */
export const newMarkerId = (() => {
  let id = 1
  return (): number => {
    id += 1
    return id
  }
})()

/**
 * Storeの初期化処理
 */
export function initialize (store: Redux.Store<any>) {
  // 自分の位置
  if (navigator.geolocation) {
    appUtil.getMyLocation()
      .then((location: Location) => {
        let myMarker: Marker = {
          id: newMarkerId(),
          type: 'person',
          name: 'You',
          location: location,
          keys: {}
        }
        store.dispatch(actions.markers.addMarker(myMarker))
      }).then(() => {
        // 一定時間ごとに更新
        setInterval(() => {
          appUtil.getMyLocation()
          .then((location: Location) => {
            store.dispatch(actions.markers.updateMarker({
              id: 1,
              location
            }))
          })
        }, 5000)
      }).catch((err) => {
        console.error('閲覧者の位置情報を取得できませんでした')
      })
  } else {
    debug('Not found navigator.geolocation')
  }

  // 本部
  bRequest({
    url: urls.centerLocation(),
    method: 'GET',
    json: true
  }, (err, res, body) => {
    // let centerLocation: Location = err ? { lat: 0, lng: 0 } : body
    let centerLocation = {
      lat: 35.701562,
      lng: 139.753148
    }
    let marker: Marker = {
        id: newMarkerId(),
        type: 'center',
        name: '本部',
        location: centerLocation,
        keys: {}
    }
    store.dispatch(actions.markers.addMarker(marker))
    store.dispatch(actions.map.changeMapCenter(centerLocation))
  })

  // 最新の通報
  bRequest({
    url: urls.openReports(),
    method: 'GET',
    json: true
  }, (err, res, body) => {
    if (err) {
      window.alert('最新の通報情報を取得できませんでした。')
      console.error(err)
      return
    }
    let reports: Report[] = body.map((dbReport) => {
      let reportFullId: string = dbReport.report_full_id
      let reportId: number = formatter.toReportId(reportFullId)
      let actorKey: string = formatter.toActorKey(reportFullId)

      let report: Report = {
        reportFullId,
        reportId,
        actorKey,
        isOpen: true,
        reportAt: new Date(dbReport.report_at),
        // TODO latestInfoはどうするか？
        // latestInfo: dbReport.latest_info
        latestInfo: {
          reportFullId,
          location: {
            lat: 35.701562,
            lng: 139.753148
          },
          event: 'emergency',
          date: new Date(),
          info: {}
        }
      }
      return report
    })
    store.dispatch(actions.reports.setReports(reports))

    // 通報を地図に反映
    let markers: Marker[] = reports.map((report) => {
      let marker: Marker = {
        id: newMarkerId(),
        type: 'report',
        name: `通報@${report.reportAt.toString()}`,
        location: report.latestInfo.location,
        keys: {
          reportFullId: report.reportFullId
        }
      }
      return marker
    })
    store.dispatch(actions.markers.addMarkers(markers))
  })
}

// getLatestReport ({state, actorKey}) {
//   // 末尾が最新
//   assert.ok(state, 'getLatestReport in store_util.js')
//   if (!this.hasOpenReport({state, actorKey})) {
//     return null
//   }
//   let {reports} = state
//   let reportList = reports[actorKey]
//   return reportList[reportList.length - 1]
// },
// getFirstReport ({state, actorKey}) {
//   assert.ok(state, 'getFirstReport in store_util.js')
//   // 先頭が最初
//   if (!this.hasOpenReport({state, actorKey})) {
//     return null
//   }
//   let {reports} = state
//   let reportList = reports[actorKey]
//   return reportList[0]
// },
// hasOpenReport ({state, actorKey}) {
//   assert.ok(state, 'hasOpenReport in store_util.js')
//   return state.reports[actorKey] && state.reports[actorKey].length > 0
// }

export default {
  getSelectedMarker,
  newMarkerId,
  initialize
}
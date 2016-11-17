import assert from 'assert'
import Store from '../interfaces/store'
import { Marker, Report } from '../interfaces/app'

/**
 * Store util functions
 */
export default {
  getSelectedMarker (state: Store.State): Marker | null {
    let { markers, selectedMarker } = state
    let { id } = selectedMarker
    let marker = markers.get(id)
    return marker || null
  },
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
}

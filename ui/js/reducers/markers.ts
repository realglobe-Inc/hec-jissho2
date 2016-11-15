import * as Im from 'immutable'
import * as Actions from '../interfaces/actions'
import { Reducer, Store } from '../interfaces/store'
import { Marker } from '../interfaces/app'

let init: Store.Markers = Im.Map<string, Marker>()
const markers: Reducer<Store.Markers> = (state: Store.Markers = init, action: Actions.MarkersAction) => {
  switch (action.type) {
    case Actions.SET_MARKERS:
      // return action.markers
    case Actions.ADD_MARKER:
      // return state.concat(action.marker)
    case Actions.REMOVE_MARKER:
      // return state.filter((marker) => marker.key !== action.key)
    case Actions.UPDATE_MARKER:
      // {
      //   let markerIndex = state.findIndex(marker => marker.key === action.key)
      //   if (markerIndex === -1) {
      //     return state
      //   }
      //   let marker = Object.assign({}, state[markerIndex])
      //   let {location} = action
      //   marker.location = location
      //   let markers = [].concat(state)
      //   markers[markerIndex] = marker
      //   return markers
      // }
    default:
      return state
  }
}

export default markers

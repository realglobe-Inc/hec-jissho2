import * as Im from 'immutable'
import * as Actions from '../interfaces/actions'
import { Reducer, Store } from '../interfaces/store'
import { Marker } from '../interfaces/app'

let init: Store.Markers = Im.Map<number, Marker>()
const markers: Reducer<Store.Markers> = (state: Store.Markers = init, action: Actions.MarkersAction) => {
  switch (action.type) {
    case Actions.SET_MARKERS:
      let next = action.markers.reduce((marker: Marker) => {
        return {
          [marker.id]: marker
        }
      }, {})
      return Im.Map<number, Marker>(next)
    case Actions.ADD_MARKER:
      return state.set(action.marker.id, action.marker)
    case Actions.REMOVE_MARKER:
      return state.remove(action.id)
    case Actions.UPDATE_MARKER:
      return state.update(action.id, (marker: Marker) => {
        marker.location = action.location
        return marker
      })
    default:
      return state
  }
}

export default markers

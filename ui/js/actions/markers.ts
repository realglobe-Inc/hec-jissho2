import * as Actions from '../interfaces/actions'
import { Marker, Location } from '../interfaces/app'

type Creator = Actions.ActionCreator<Actions.MarkersAction>

export const setMarker: Creator = (markers: Marker[]) => ({
  type: Actions.SET_MARKERS,
  markers
})

export const addMarker: Creator = (marker: Marker) => ({
  type: Actions.ADD_MARKER,
  marker
})

export const removeMarker: Creator = (id: number) => ({
  type: Actions.REMOVE_MARKER,
  id
})

export const updateMarker: Creator = ({id, location}: {id: number, location: Location}) => ({
  type: Actions.UPDATE_MARKER,
  id,
  location
})
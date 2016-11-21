/**
 * The top level reducer.
 */

import { combineReducers } from 'redux'
import { Store } from '../interfaces/store'
import callers from './callers'
import infoDisplay from './info_display'
import markers from './markers'
import map from './map'
import modalWindow from './modal_window'
import selectedMarker from './selected_marker'
import reports from './reports'
import reportClosed from './report_closed'
import photos from './photos'

const Reducer = combineReducers<Store.State>({
  callers,
  infoDisplay,
  markers,
  map,
  modalWindow,
  selectedMarker,
  reports,
  reportClosed,
  photos
})

export default Reducer

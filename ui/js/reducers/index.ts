/**
 * The top level reducer.
 */

import { combineReducers } from 'redux'
import callers from './callers'
import infoDisplay from './info_display'
import markers from './markers'
import map from './map'
import modalWindow from './modal_window'
import selectedMarker from './selected_marker'
import reports from './reports'
import reportClosed from './report_closed'

const Reducer = combineReducers({
  callers,
  infoDisplay,
  markers,
  map,
  modalWindow,
  selectedMarker,
  reports,
  reportClosed
})

export default Reducer

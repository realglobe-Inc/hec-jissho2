import { Reducer, Store } from '../interfaces/store'
import * as Actions from '../interfaces/actions'

let init: Store.SelectedMarkerKey = {
  isSelected: false,
  key: ''
}

/**
 * Reducer of selected spot
 */
const selectedMarkerKey: Reducer<Store.SelectedMarkerKey> = (state: Store.SelectedMarkerKey = init, action: Actions.SelectedMarkerKeyAction) => {
  switch (action.type) {
    case Actions.SELECT_MARKER_KEY:
      return {
        isSelected: true,
        key: action.key
      }
    case Actions.CANCEL_SELECT_MARKER:
      return {
        isSelected: false,
        key: action.key
      }
    default:
      return state
  }
}

export default selectedMarkerKey

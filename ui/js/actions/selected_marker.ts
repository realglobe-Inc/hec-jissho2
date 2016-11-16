import * as Actions from '../interfaces/actions'

type Creator = Actions.ActionCreator<Actions.SelectedMarkerAction>

export const selectMarker: Creator = (id: number) => ({
  type: Actions.SELECT_MARKER,
  id
})

export const cancelSelectMarker: Creator = () => ({
  type: Actions.CANCEL_SELECT_MARKER
})
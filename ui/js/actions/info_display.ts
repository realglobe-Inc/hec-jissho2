import * as Actions from '../interfaces/actions'

export const toggleInfoDisplay: Actions.ActionCreator<void> = () => ({
  type: Actions.TOGGLE_INFO_DISPLAY
})
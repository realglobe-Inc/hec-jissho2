import * as Actions from '../interfaces/actions'
import { Location } from '../interfaces/app'

export const changeMapCenter: Actions.ActionCreator<Actions.MapActtion> = (location: Location) => ({
  type: Actions.CHANGE_MAP_CENTER,
  location: location
})
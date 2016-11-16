import * as Actions from '../interfaces/actions'
import { Caller } from '../interfaces/app'

type Creator = Actions.ActionCreator<Actions.CallersAction>

export const addCaller: Creator = ({key, caller}: {key: string, caller: Caller}) => ({
  type: Actions.ADD_CALLER,
  key,
  caller
})

export const removeCaller: Creator = (key: string) => ({
  type: Actions.REMOVE_CALLER,
  key
})
import * as Actions from '../interfaces/actions'

type Creator = Actions.ActionCreator<Actions.ModalWindowAction>

export const openReportCloseModal: Creator = () => ({
  type: Actions.OPEN_REPORTCLOSE_MODAL
})

export const closeReportCloseModal: Creator = () => ({
  type: Actions.CLOSE_REPORTCLOSE_MODAL
})

export const openOkWarningModal: Creator = () => ({
  type: Actions.OPEN_OKWARNING_MODAL
})

export const closeOkWarningModal: Creator = () => ({
  type: Actions.CLOSE_OKWARNING_MODAL
})
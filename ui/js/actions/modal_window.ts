import * as Actions from '../interfaces/actions'

type Action = Actions.ModalWindowAction

export const openReportCloseModal = (): Action => ({
  type: Actions.OPEN_REPORTCLOSE_MODAL
})

export const closeReportCloseModal = (): Action => ({
  type: Actions.CLOSE_REPORTCLOSE_MODAL
})

export const openOkWarningModal = (): Action => ({
  type: Actions.OPEN_OKWARNING_MODAL
})

export const closeOkWarningModal = (): Action => ({
  type: Actions.CLOSE_OKWARNING_MODAL
})

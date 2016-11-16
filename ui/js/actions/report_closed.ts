import * as Actions from '../interfaces/actions'
import { Report } from '../interfaces/app'

type Creator = Actions.ActionCreator<Actions.ReportClosedAction>

export const setClosedReport: Creator = (report: Report) => ({
  type: Actions.SET_CLOSED_REPORT,
  report: report
})

export const clearClosedReport: Creator = () => ({
  type: Actions.CLEAR_CLOSED_REPORT
})
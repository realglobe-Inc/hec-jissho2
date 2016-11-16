import * as Actions from '../interfaces/actions'
import { Report, ReportInfo } from '../interfaces/app'

type Creator = Actions.ActionCreator<Actions.ReportsAction>

export const setReports: Creator = (reports: Report[]) => ({
  type: Actions.SET_REPORTS,
  reports
})

export const addReport: Creator = (report: Report) => ({
  type: Actions.ADD_REPORT,
  report
})

export const removeReport: Creator = (reportFullId: string) => ({
  type: Actions.REMOVE_REPORT,
  reportFullId
})

export const UpdateReportInfo: Creator = (reportInfo: ReportInfo) => ({
  type: Actions.UPDATE_REPORT_INFO,
  reportInfo
})
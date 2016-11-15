import { Location, Report, ReportInfo, Marker } from './app'

export interface Action {
  type: string
}

// info_display
export const TOGGLE_INFO_DISPLAY: string = 'TOGGLE_INFO_DISPLAY';
export interface InfoDisplayAction extends Action {}

// map
export const CHANGE_MAP_CENTER: 'CHANGE_MAP_CENTER' = 'CHANGE_MAP_CENTER'
export interface MapActtion extends Action {
  location: Location
}

// modal window
export const OPEN_REPORTCLOSE_MODAL: string = 'OPEN_REPORTCLOSE_MODAL'
export const CLOSE_REPORTCLOSE_MODAL: string = 'CLOSE_REPORTCLOSE_MODAL'
export const OPEN_OKWARNING_MODAL: string = 'OPEN_OKWARNING_MODAL'
export const CLOSE_OKWARNING_MODAL: string = 'CLOSE_OKWARNING_MODAL'
export interface ModalWindowAction extends Action {}

// report closed
export const SET_CLOSED_REPORT: string = 'SET_CLOSED_REPORT'
export const CLEAR_CLOSED_REPORT: string = 'CLEAR_CLOSED_REPORT'
export interface ReportClosedAction extends Action {
  report: Report
}

// reports
export const SET_REPORTS: 'SET_REPORTS' = 'SET_REPORTS'
export const ADD_REPORT: 'ADD_REPORT' = 'ADD_REPORT'
export const REMOVE_REPORT: 'REMOVE_REPORT' = 'REMOVE_REPORT'
export const UPDATE_REPORT_INFO: 'UPDATE_REPORT_INFO' = 'UPDATE_REPORT_INFO'
interface SetReportsAction {
  type: 'SET_REPORTS'
  reports: Report[]
}
interface AddReportAction {
  type: 'ADD_REPORT'
  report: Report
}
interface RemoveReportAction {
  type: 'REMOVE_REPORT'
  reportFullId: string
}
interface UpdateReportInfoAction {
  type: 'UPDATE_REPORT_INFO'
  reportInfo: ReportInfo
}
export type ReportsAction = SetReportsAction | AddReportAction | RemoveReportAction | UpdateReportInfoAction

// markers
export const SET_MARKERS: 'SET_MARKERS' = 'SET_MARKERS'
export const ADD_MARKER: 'ADD_MARKER' = 'ADD_MARKER'
export const REMOVE_MARKER: 'REMOVE_MARKER' = 'REMOVE_MARKER'
export const UPDATE_MARKER: 'UPDATE_MARKER' = 'UPDATE_MARKER'
interface SetMarkerAction {
  type: 'SET_MARKERS'
  markers: Marker[]
}
interface AddMarkerAction {
  type: 'ADD_MARKER'
  marker: Marker
}
interface RemoveMarkerAction {
  type: 'REMOVE_MARKER'
  key: string
}
interface UpdateMarkerAction {
  type: 'UPDATE_MARKER'
  key: string
  location: Location
}
export type MarkersAction = SetMarkerAction | AddMarkerAction | RemoveMarkerAction | UpdateMarkerAction

// selected marker key
export const SELECT_MARKER_KEY: string = 'SELECT_MARKER_KEY'
export const CANCEL_SELECT_MARKER: string = 'CANCEL_SELECT_MARKER'
export interface SelectedMarkerKeyAction extends Action {
  key?: string
}
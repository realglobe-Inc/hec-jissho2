import * as App from './app'
import * as Im from 'immutable'

// reducer
export type Reducer<T> = (state: T, action: {type: string}) => T

// Store state
export namespace Store {
  export type InfoDisplay = boolean

  export interface Map {
    center: App.Location
  }

  export type Markers = Im.Map<number, App.Marker>

  export interface ModalWindow {
    reportClose: boolean
    okWarning: boolean
  }

  export interface ReportClosed {
    report: App.Report
    closed: boolean
  }

  type reportFullId = string
  export type Reports = Im.Map<reportFullId, App.Report>

  export interface SelectedMarker {
    isSelected: boolean
    id: number
  }

  type actorKey = string
  export type Callers = Im.Map<actorKey, App.Caller>

  export interface State {
    infoDisplay: InfoDisplay
    map: Map
    markers: Markers
    modalWindow: ModalWindow
    reportClosed: ReportClosed
    reports: Reports
    selectedMarker: SelectedMarker
    callers: Callers
  }
}


export default Store
export interface Location {
  lat: number
  lng: number
}

export interface ReportInfo {
  reportFullId: string
  location: Location // DB Model と違っているので注意
  event: string
  date: Date
  info: any
}

export interface Report {
  reportFullId: string
  reportId: number
  actorKey: string
  reportAt: Date
  closedAt: string
  isOpen: boolean
  latestInfo?: ReportInfo
}

export type MarkerType = 'report' | 'center' | 'drone' | 'person' | 'default'

export interface Marker {
  id: number
  type: MarkerType
  name: string
  location: Location
  keys: {
    reportFullId?: string
    actorKey?: string
  }
}

export interface Caller {
  get()
}
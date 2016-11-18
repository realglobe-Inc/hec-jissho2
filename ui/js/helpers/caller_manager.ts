import * as sugoCaller from 'sugo-caller'
import urls from './urls'
import store from './store'
import actions from '../actions'
import { Caller, Report, ReportInfo, Marker } from '../interfaces/app'
import { newMarkerId } from './store_util'
import { Store } from '../interfaces/store'

const debug = require('debug')('hec:caller_manager')
const { SUGOS } = require('@self/server/lib/consts')
const {
  REPORTER_MODULE,
  MASTER_ACTOR
} = SUGOS

/**
 * 必要な Actor に接続しに行く
 */
export function connectCallers () {
  {
    // Report Actor
    let key: string = MASTER_ACTOR.KEY
    sugoCaller(urls.callers())
      .connect(key)
      .then((caller: Caller) => {
        debug(`Connected caller: ${key}`)
        initializeReporter(key, caller)
        store.dispatch(actions.callers.addCaller({
          key,
          caller
        }))
      })
  }
}

/**
 * 通報callerの初期化
 */
export function initializeReporter (key: string, caller: Caller) {
  let reporter = caller.get(MASTER_ACTOR.MODULE)
  reporter.on(MASTER_ACTOR.NEW_REPORT_EVENT, (report: Report) => {
    debug('New report: ', report)
    let marker: Marker = {
      id: newMarkerId(),
      type: 'report',
      name: `通報@${report.reportAt}`,
      location: report.latestInfo.location,
      keys: {
        reportFullId: report.reportFullId
      }
    }
    store.dispatch(actions.reports.addReport(report))
    store.dispatch(actions.markers.addMarker(marker))
    store.dispatch(actions.selectedMarker.selectMarker(marker.id))
    store.dispatch(actions.modalWindow.openOkWarningModal())
  })
  reporter.on(MASTER_ACTOR.REPORT_INFO_EVENT, (info: ReportInfo) => {
    let state: Store.State = store.getState()
    let report: Report = state.reports.get(info.reportFullId, null)
    if (!report) {
      return
    }
    store.dispatch(actions.reports.UpdateReportInfo(info))
  })
}
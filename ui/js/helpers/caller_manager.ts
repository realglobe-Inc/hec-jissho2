import * as sugoCaller from 'sugo-caller'
import urls from './urls'
import store from './store'
import actions from '../actions'
import { Caller, Report, ReportInfo, Marker, PhotoInfo } from '../interfaces/app'
import { newMarkerId } from './store_util'
import { Store } from '../interfaces/store'

const debug = require('debug')('hec:caller_manager')
const { SUGOS } = require('@self/server/lib/consts')
const {
  REPORTER_MODULE,
  MASTER_ACTOR,
  PHOTO_MONITOR_ACTOR
} = SUGOS

/**
 * Camera server 用の actor に接続する
 */
export function connectCameraCaller () {
  let key: string = PHOTO_MONITOR_ACTOR.KEY
  return sugoCaller(urls.uiCallers())
          .connect(key)
          .then((caller: Caller) => {
            debug(`Connected caller: ${key}`)
            initializeCameraMonitor(key, caller)
            store.dispatch(actions.callers.addCaller({
              key, caller
            }))
          })
}

/**
 * Report server 用の actor に接続する
 */
export function connectReportCaller () {
  let key: string = MASTER_ACTOR.KEY
  return sugoCaller(urls.uiCallers())
          .connect(key)
          .then((caller: Caller) => {
            debug(`Connected caller: ${key}`)
            initializeReporter(key, caller)
            store.dispatch(actions.callers.addCaller({
              key, caller
            }))
          })
}

/**
 * 通報callerの初期化
 */
export function initializeReporter (key: string, caller: Caller) {
  let reporter = caller.get(MASTER_ACTOR.MODULE)
  reporter.on(MASTER_ACTOR.NEW_REPORT_EVENT, (report: Report) => {
    debug('New report: ', report)
    report.reportAt = new Date(report.reportAt) // Date 型だけ注意
    let marker: Marker = {
      id: newMarkerId(),
      type: 'report',
      name: `通報@${report.reportAt}`,
      location: report.latestInfo.location,
      keys: {
        reportFullId: report.reportFullId
      }
    }
    // 警報音
    let audio = document.createElement('audio')
    audio.src = 'warning.mp3'
    audio.autoplay = true
    // 関係各所にdispatch
    store.dispatch(actions.reports.addReport(report))
    store.dispatch(actions.markers.addMarker(marker))
    store.dispatch(actions.selectedMarker.selectMarker(marker.id))
    store.dispatch(actions.modalWindow.openOkWarningModal())
  })
  reporter.on(MASTER_ACTOR.REPORT_INFO_EVENT, (info: ReportInfo) => {
    info.date = new Date(info.date) // Date 型だけ注意
    let state: Store.State = store.getState()
    let report: Report = state.reports.get(info.reportFullId, null)
    if (!report) {
      return
    }
    store.dispatch(actions.reports.UpdateReportInfo(info))
  })
}

/**
 * カメラサーバー監視callerの初期化
 */
function initializeCameraMonitor (key: string, caller: Caller) {
  let monitor = caller.get(PHOTO_MONITOR_ACTOR.MODULE)
  monitor.on(PHOTO_MONITOR_ACTOR.CREATED_EVENT, (photo: PhotoInfo) => {
    debug(`Added photo ${photo.uuid}`)
    store.dispatch(actions.photos.addPhoto(photo))
  })
  monitor.on(PHOTO_MONITOR_ACTOR.REMOVED_EVENT, (data) => {
    debug(data)
  })
}

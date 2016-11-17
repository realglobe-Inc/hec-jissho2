import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '../helpers/store'
import AppStyle from '../components/app_style'
import Header from '../components/header'
import OkWarningWindow from '../containers/ok_warning_window'
import ConfirmCloseReportWindow from '../containers/confirm_close_report_window'
import MapController from '../components/map_controller'

const rootElement = document.getElementById('site')

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <AppStyle/>
        <Header/>
        <MapController/>
        <OkWarningWindow/>
        <ConfirmCloseReportWindow/>
      </div>
    </Provider>,
    rootElement
  )
})

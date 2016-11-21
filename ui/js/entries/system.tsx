import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '../helpers/store'
import AppStyle from '../components/app_style'
import Header from '../components/header'
import OkWarningWindow from '../containers/ok_warning_window'
import ConfirmCloseReportWindow from '../containers/confirm_close_report_window'
import MapController from '../components/map_controller'
import { initialize } from '../helpers/store_util'
import PhotoList from '../components/photo_list'

const rootElement = document.getElementById('site')

let photoListStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%'
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <AppStyle/>
        <Header/>
        <MapController/>
        <PhotoList style={photoListStyle}/>
        <OkWarningWindow/>
        <ConfirmCloseReportWindow/>
      </div>
    </Provider>,
    rootElement
  )

  initialize(store)
})

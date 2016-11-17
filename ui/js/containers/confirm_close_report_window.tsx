import * as React from 'react'
import { connect } from 'react-redux'
import * as c from 'classnames'
import { ApButton } from 'apeman-react-button'
import actions from '../actions'
import Store from '../interfaces/store'
// import appUtil from '../utils/app_util'

const debug = require('debug')('hec:ConfirmCloseReportWindow')

interface Props {
  storeState: Store.State
  dispatch: any
}

class ConfirmCloseReportWindow extends React.Component<Props, any> {
  render () {
    const s = this
    let visible = s.props.storeState.modalWindow.reportClose
    return (
      <div className={c('modal-window-background', visible ? '' : 'hidden')}>
        <div className='confirm-close-report'>
          <div className='message'>
            通報をクローズしますか？
          </div>
          <div className='buttons'>
            <ApButton onTap={s.yes}>はい</ApButton>
            <ApButton onTap={s.no}>いいえ</ApButton>
          </div>
        </div>
      </div>
    )
  }

  yes () {
    const s = this
    let { selectedMarker, markers } = s.props.storeState
    let { id } = selectedMarker
    let marker = markers.get(id)
    let reportFullId = marker.keys.reportFullId

    // TODO close処理
    // app.closeReport(reportFullId)

    s.closeSelf()
  }

  no () {
    const s = this
    s.closeSelf()
  }

  closeSelf () {
    this.props.dispatch(actions.modalWindow.closeReportCloseModal())
  }
}

export default connect(
  (storeState: Store.State) => ({ storeState }),
  (dispatch) => ({ dispatch })
)(ConfirmCloseReportWindow)

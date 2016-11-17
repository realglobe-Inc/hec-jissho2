import * as React from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
import * as c from 'classnames'
import Store from '../interfaces/store'
import storeUtil from '../helpers/store_util'
import appUtil from '../helpers/app_util'
import { ApButton } from 'apeman-react-button'

const debug = require('debug')('hec:AreaReport')

interface ReportWatchProps {
  start: Date
}

interface ReportWatchState {
  ms: number
}

/**
 * 通報からの時間を表示する
 */
class ReportWatch extends React.Component<ReportWatchProps, any> {

  constructor (props: ReportWatchProps) {
    super(props)
    this.state = {
      ms: Number(new Date()) - Number(this.props.start),
      timer: null
    }
  }

  render () {
    const s = this
    let { ms } = s.state
    let padding = number => ('0' + number).slice(-2)
    let seconds = Math.floor(ms / 1000)
    let hours = Math.floor(seconds / 3600)
    seconds %= 3600
    let minutes = Math.floor(seconds / 60)
    seconds %= 60
    return (
      <div className='report-watch'>
       {hours} 時間 {padding(minutes)} 分 {padding(seconds)} 秒
      </div>
    )
  }

  componentDidMount () {
    const s = this
    let timer = setInterval(() => {
      s.setState({ms: Number(new Date()) - Number(s.props.start)})
    }, 1000)
    s.setState({
      timer
    })
  }

  componentWillUnmount () {
    clearInterval(this.state.timer)
  }
}

interface Props {
  storeState: Store.State
  dispatch: any
}

class AreaReport extends React.Component<Props, any> {
  render () {
    const s = this
    let state = s.props.storeState
    let { selectedMarker, reports } = state
    let marker = storeUtil.getSelectedMarker(state)
    let report = reports.get(marker.keys.reportFullId)
    return (
      <div className='area-report'>
        <h4>{marker ? marker.name : '通報'}</h4>
        <div className='info'>
          <div className='name'>
            住所
          </div>
          <div className='value'>
            {/* /marker ? marker.address : '' */}
          </div>
        </div>
        <div className='info'>
          <div className='name'>
            通報からの経過時間
          </div>
          <div className='value'>
            <ReportWatch start={report.reportAt}/>
          </div>
        </div>
        <div className='info'>
          <div className='name'>
            通報日時
          </div>
          <div className='value'>
            {appUtil.formatTime(report.reportAt, { type: 'full_jp' })}
          </div>
        </div>
        <div className='info'>
          {/* FIXME This is ハリボテ */}
          <div className='name'>
            理由
          </div>
          <div className='value'>
            心肺停止
          </div>
        </div>
        <div className='info'>
          <div className='name'>
            心拍数
          </div>
          <div className='value'>
          </div>
        </div>

        {s.renderCloseButton()}
      </div>
    )
  }

  renderCloseButton () {
    return (
      <div className='close-report'>
        <ApButton
          primary wide danger style={{border: '0 solid'}}
          onTap={this.showConfirmWindow.bind(this)}
          >
          通報をクローズする
        </ApButton>
      </div>
    )
  }

  /**
   * 通報クローズの確認画面
   */
  showConfirmWindow () {
    this.props.dispatch(actions.modalWindow.openReportCloseModal())
  }
}

export default connect(
  (storeState: Store.State) => ({ storeState }),
  (dispatch) => ({ dispatch })
)(AreaReport)

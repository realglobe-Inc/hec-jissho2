/**
 * Controller panel
 */
import * as React from 'react'
import { connect } from 'react-redux'
import ControllerPanelArea from '../containers/controller_panel_area'
import ControllerPanelSelect from '../containers/controller_panel_select'
import actions from '../actions'
import * as c from 'classnames'
import Store from '../interfaces/store'

const debug = require('debug')('hec:ControllerPanel')

interface Props {
  storeState: Store.State
  dispatch: any
}

class ControllerPanel extends React.Component<Props, any> {
  render () {
    const s = this
    let display = s.props.storeState.infoDisplay
    return (
      <div className={c('controller-panel', display ? '' : 'pannel-hidden')}>
        <div className='panel-display-toggle'>
          <i className={c('fa', 'fa-3x', display ? 'fa-caret-left' : 'fa-caret-right')} aria-hidden></i>
          <div className='expand' onClick={s.toggleDisplay.bind(s)}></div>
        </div>
        <ControllerPanelSelect/>
        <ControllerPanelArea/>
      </div>
    )
  }

  toggleDisplay () {
    debug('Toggle panel')
    this.props.dispatch(actions.infoDisplay.toggleInfoDisplay())
  }
}

export default connect(
  (storeState: Store.State) => ({ storeState }),
  (dispatch) => ({ dispatch })
)(ControllerPanel)


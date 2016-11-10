import * as React from 'react'
import { Dispatch } from "redux"
import { connect } from 'react-redux'
import actions from '../actions'

interface Props {
  storeState: any,
  dispatch: Dispatch<any>
}

class Counter extends React.Component<Props, {}> {
  render () {
    return (
      <div>
        <input type='button' onClick={() => { this.props.dispatch(actions.incrementCount()) }} value='Button'/>
        <div>
          Counter: {this.props.storeState.count}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (storeState: any) => ({ storeState })
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({ dispatch })

const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter)

export default CounterContainer

import * as React from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
import * as c from 'classnames'
import Store from '../interfaces/store'
import storeUtil from '../helpers/store_util'
import appUtil from '../helpers/app_util'
import PhotoList from '../components/photo_list'

interface Props {
  storeState: Store.State
  dispatch: any
}

class PhotoListContainer extends React.Component<Props, {}> {
  render () {
    let { photos } = this.props.storeState
    return <PhotoList photos={photos}/>
  }
}

export default connect(
  (storeState: Store.State) => ({ storeState }),
  (dispatch) => ({ dispatch })
)(PhotoListContainer)
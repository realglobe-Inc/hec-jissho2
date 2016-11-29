/**
 * 単一のコンポーネントで画像の一覧表示、全画面表示、リアルタイム更新を担当する
 */
import * as React from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
import * as c from 'classnames'
import { PhotoInfo, Caller } from '../interfaces/app'
import urls from '../helpers/urls'
import appUtil from '../helpers/app_util'
import * as sugoCaller from 'sugo-caller'
import { Store } from '../interfaces/store'
import { ApButton } from 'apeman-react-button'
import * as bRequest from 'browser-request'

const cssVars = require('../../scss/vars.json')
const { PHOTO_MONITOR_ACTOR } = require('@self/server/lib/consts').SUGOS
const THUMBNAIL_PHOTO_SIZE = {
  width: 320,
  height: 180
}

interface Props {
  photos: Store.Photos
  showPanel: Store.ShowPanel
  dispatch: any
}

interface State {
  modalMode?: boolean
  selectedPhoto?: PhotoInfo | null
}

class PhotoList extends React.Component<Props, State> {
  constructor () {
    super()
    this.state = {
      modalMode: false,
      selectedPhoto: null
    }
  }

  render () {
    const s = this
    // photos は古い順にセットされている
    // TODO ここで制限するべきかどうか
    let max = 20
    let listHeight = window.innerHeight - parseInt(cssVars['header-height'], 10)

    let show = s.props.showPanel.photo
    return (
      <div className='photo-list-ex'>
        <div className={c('photo-list-outer', show ? 'photo-list-show' : 'photo-list-hidden')}>
          <div className='photo-list-toggle'>
            <i className={c('fa', 'fa-3x', show ? 'fa-caret-right' : 'fa-caret-left')} aria-hidden></i>
            <div className='expand' onClick={s.toggleDisplay.bind(s)}></div>
          </div>
          <div className='title'>
            ドローンからの画像
          </div>
          <div className='photo-list' style={{height: `${listHeight}px`}}>
            {s.props.photos.toArray().reverse().slice(0, max).map((photo) => {
              return (
                  <img className='photo-list-item'
                      src={urls.getPhoto(photo.image, THUMBNAIL_PHOTO_SIZE)}
                      onClick={s.openModal.bind(this)}
                      key={photo.uuid}
                      data={photo.uuid}
                  />
              )
            })}
          </div>
        </div>
        <div className={c('photo-zoom-outer', s.state.modalMode ? '' : 'hidden')} onClick={s.closeModal.bind(s)}>
          <div className='share-photo-button'>
            <ApButton wide onTap={s.sendPhotoInfo.bind(s)}>共有する</ApButton>
          </div>
          {s.renderZoomImage()}
        </div>
      </div>
    )
  }

  toggleDisplay () {
    this.props.dispatch(actions.showPanel.togglePhotoDisplay())
  }

  renderZoomImage () {
    let { selectedPhoto } = this.state
    if (!selectedPhoto) {
      return null
    }
    return <img className='photo-zoom' src={urls.getPhoto(selectedPhoto.image)} />
  }

  openModal (e) {
    let uuid = e.target.attributes.data.value
    let photo = this.props.photos.get(uuid)
    this.setState({
      modalMode: true,
      selectedPhoto: photo
    })
  }

  closeModal () {
    this.setState({ modalMode: false })
  }

  sendPhotoInfo () {
    let photo = this.state.selectedPhoto
    let url = urls.sharePhoto()
    bRequest({
      url,
      method: 'POST',
      json: true,
      body: photo
    }, (err, res, body) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(body)
    })
  }
}

export default connect(
  (state: Store.State) => ({ photos: state.photos, showPanel: state.showPanel }),
  (dispatch) => ({ dispatch })
)(PhotoList)
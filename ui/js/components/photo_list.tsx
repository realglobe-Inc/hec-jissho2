/**
 * 単一のコンポーネントで画像の一覧表示、全画面表示、リアルタイム更新を担当する
 */
import * as React from 'react'
import * as c from 'classnames'
import { PhotoInfo, Caller } from '../interfaces/app'
import urls from '../helpers/urls'
import appUtil from '../helpers/app_util'
import * as sugoCaller from 'sugo-caller'
import { Store } from '../interfaces/store'

const { PHOTO_MONITOR_ACTOR } = require('@self/server/lib/consts').SUGOS
const THUMBNAIL_PHOTO_SIZE = {
  width: 320,
  height: 180
}

interface Props {
  style?: Object
  photos: Store.Photos
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
    let style = s.props.style || {}
    // photos は古い順にセットされている
    return (
      <div className='photo-list-outer'>
        <div className='photo-list' style={style}>
          {s.props.photos.toArray().map((photo) => {
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
        <div className={c('photo-zoom-outer', s.state.modalMode ? '' : 'hidden')} onClick={s.closeModal.bind(s)}>
          {s.renderZoomImage()}
        </div>
      </div>
    )
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
}

export default PhotoList

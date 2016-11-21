/**
 * 単一のコンポーネントで画像の一覧表示、全画面表示、リアルタイム更新を担当する
 */
import * as React from 'react'
import * as c from 'classnames'
import { PhotoInfo, Caller } from '../interfaces/app'
import urls from '../helpers/urls'
import appUtil from '../helpers/app_util'
import * as sugoCaller from 'sugo-caller'

const { PHOTO_MONITOR_ACTOR } = require('@self/server/lib/consts').SUGOS

interface Props {
  style?: Object
}

interface State {
  list?: PhotoInfo[]
  modalMode?: boolean
  selectedUrl?: string
  caller?: any
}

class PhotoList extends React.Component<Props, State> {
  constructor () {
    super()
    this.state = {
      list: [],
      modalMode: false,
    }
  }

  render () {
    const s = this
    return (
      <div className='photo-list-outer'>
        <div className='photo-list' style={s.props.style}>
          {s.state.list.map((photo) => {
            return (
                <img className='photo-list-item'
                      src={urls.getPhoto(photo.image)}
                      onClick={s.openModal.bind(this)}
                      key={photo.uuid}
                      data={photo.image}
                />
            )
          })}
        </div>
        <div className={c('photo-zoom-outer', s.state.modalMode ? '' : 'hidden')} onClick={s.closeModal.bind(s)}>
          <img className='photo-zoom'
               src={urls.getPhoto(this.state.selectedUrl)}/>
        </div>
      </div>
    )
  }

  componentDidMount () {
    const s = this
    appUtil.fetchPhotoList()
      .then((list: PhotoInfo[]) => {
        s.setState({ list })
      })

    let KEY: string = PHOTO_MONITOR_ACTOR.KEY
    let MODULE: string = PHOTO_MONITOR_ACTOR.MODULE
    let CREATED_EVENT: string = PHOTO_MONITOR_ACTOR.CREATED_EVENT
    if (s.state.caller) {
      return
    }
    console.log('hogehoge')
    let caller = sugoCaller(urls.callers())
    caller.connect(KEY)
      .then((actor: Caller) => {
        let monitor = actor.get(MODULE)
        monitor.on(CREATED_EVENT, (data: PhotoInfo) => {
          s.setState({
            list: [ data ].concat(s.state.list)
          })
        })
      })
    s.setState({ caller })
  }

  componentWillUnmount () {
    let { caller } = this.state
    if (caller) {
      caller.disconnect()
    }
  }

  openModal (e) {
    let selectedUrl = e.target.attributes.data.value
    this.setState({
      modalMode: true,
      selectedUrl
    })
  }

  closeModal () {
    this.setState({ modalMode: false })
  }
}

export default PhotoList

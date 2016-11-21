import * as React from 'react'
import * as c from 'classnames'
import { PhotoInfo } from '../interfaces/app'
import urls from '../helpers/urls'

interface Props {
  list: PhotoInfo[]
}

interface State {
  modalMode?: boolean,
  selectedUUID?: string
}

class PhotoList extends React.Component<Props, State> {
  constructor () {
    super()
    this.state = {
      modalMode: false,
      selectedUUID: ''
    }
  }

  render () {
    const s = this
    return (
      <div className='photo-list-outer'>
        <div className='photo-list'>
          {this.props.list.map((photo) => {
            return (
                <img className='photo-list-item'
                      src={urls.getPhoto(photo.uuid)}
                      onClick={s.openModal.bind(this)}
                      key={photo.uuid}
                      data={photo.uuid}
                />
            )
          })}
        </div>

        <div className={c('photo-zoom-outer', s.state.modalMode ? '' : 'hidden')} onClick={s.closeModal.bind(s)}>
          <img className='photo-zoom'
               src={urls.getPhoto(this.state.selectedUUID)}/>
        </div>
      </div>
    )
  }

  openModal (e) {
    let uuid = e.target.attributes.data.value
    this.setState({
      modalMode: true,
      selectedUUID: uuid
    })
  }

  closeModal () {
    this.setState({ modalMode: false })
  }
}

export default PhotoList

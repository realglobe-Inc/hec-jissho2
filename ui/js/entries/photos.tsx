/**
 * 写真の一覧を見るページ
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import AppStyle from '../components/app_style'
import Header from '../components/header'
import PhotoList from '../components/photo_list'
import appUtil from '../helpers/app_util'
import { PhotoInfo } from '../interfaces/app'
import * as Im from 'immutable'

const rootElement = document.getElementById('site')

interface State {
  photos: Im.Map<string, PhotoInfo>
}

class App extends React.Component<{}, State> {
  constructor () {
    super()
    this.state = {
      photos: Im.Map<string, PhotoInfo>()
    }
  }

  render () {
    return (
    <div>
      <AppStyle/>
      <Header/>
      <div style={{margin: '1em'}}>
        <PhotoList photos={this.state.photos}/>
      </div>
    </div>
    )
  }

  componentDidMount () {
    const s = this
    appUtil.fetchPhotoList()
      .then((photoArray: PhotoInfo[]) => {
        let setting = photoArray.map((photo) => ([photo.uuid, photo]))
        let photos = Im.Map<string, PhotoInfo>(setting)
        s.setState({ photos })
      })

    // TODO Caller 部分の実装
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App/>,
    rootElement
  )
})

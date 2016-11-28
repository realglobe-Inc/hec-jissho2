/**
 * タブレットから写真を見るページ
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import AppStyle from '../components/app_style'
import Header from '../components/header'
import appUtil from '../helpers/app_util'
import { PhotoInfo } from '../interfaces/app'
import urls from '../helpers/urls'
import * as bRequest from 'browser-request'
import { connectPubPhotoCaller } from '../helpers/tablet_caller_manager'

const rootElement = document.getElementById('site')
const camera = require('@self/server/env/camera.json').default

class Photo extends React.Component<{}, { photo?: PhotoInfo }> {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    let { photo } = this.state
    let url = photo ? urls.getPhoto(photo.image) : ''
    return (
      <img src={url} width={`${window.innerWidth}px`}/>
    )
  }

  componentDidMount () {
    const s = this
    bRequest({
      url: urls.sharePhoto(),
      method: 'GET',
      json: true
    }, (err, res, body) => {
      if (body && body.uuid) {
        s.setState({ photo: body })
      }
    })

    // caller が写真変更イベントを受け取ったら写真を更新する
    let onChangePhoto = (photo: PhotoInfo) => {
      console.log('change', photo)
      s.setState({
        photo
      })
    }
    connectPubPhotoCaller(onChangePhoto)
  }
}

class App extends React.Component<{}, {}> {
  render () {
    return (
    <div>
      <AppStyle/>
      <Header/>
      <Photo/>
    </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App/>,
    rootElement
  )
})

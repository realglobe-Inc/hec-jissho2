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

const rootElement = document.getElementById('site')

class App extends React.Component<{}, { list: PhotoInfo[] }> {
  constructor () {
    super()
    this.state = { list: [] }
  }
  render () {
    let { list } = this.state
    return (
    <div>
      <AppStyle/>
      <Header/>
      <div style={{margin: '1em'}}>
        <PhotoList list={list}/>
      </div>
    </div>
    )
  }

  componentDidMount () {
    const s = this
    appUtil.fetchPhotoList().then((list: PhotoInfo[]) => s.setState({ list }))
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App/>,
    rootElement
  )
})

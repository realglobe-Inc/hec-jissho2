import * as React from 'react'
import * as ReactDOM from 'react-dom'
import AppStyle from '../components/app_style'
import Header from '../components/header'

const rootElement = document.getElementById('site')

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <div>
      <AppStyle/>
      <Header/>
    </div>,
    rootElement
  )
})

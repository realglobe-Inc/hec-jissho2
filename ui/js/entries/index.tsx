import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '../helpers/store'
import Header from '../components/header'

const rootElement = document.getElementById('site')

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <Header/>
        <h1>Hello</h1>
      </div>
    </Provider>,
    rootElement
  )
})

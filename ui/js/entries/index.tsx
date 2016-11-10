import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '../helpers/store'
import Counter from '../containers/counter'

const rootElement = document.getElementById('site')

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <div>
      <h1>Hello</h1>
      <Counter/>
      </div>
    </Provider>,
    rootElement
  )
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('hoge')
      resolve()
    }, 500)
  }).then(() => {
    console.log('hoge')
  })
})

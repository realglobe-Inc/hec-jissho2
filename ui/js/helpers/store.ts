import { createStore, applyMiddleware, compose } from 'redux'
import Reducer from '../reducers'
import { Store } from '../interfaces/store'

declare var window: any

const middlewares: any[] = []

let store = createStore<Store.State>(
  Reducer,
  compose(
    // applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export default store

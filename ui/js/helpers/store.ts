import { createStore, applyMiddleware, compose } from 'redux'
import Reducer from '../reducers'
import { Store } from '../interfaces/store'

declare var window: any

const middlewares: any[] = []

let composition = compose(
  // applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

let store = process.env.NODE_ENV === 'production' ? createStore<Store.State>(Reducer) : createStore<Store.State>(
  Reducer,
  composition
)

export default store

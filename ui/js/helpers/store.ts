import { createStore, applyMiddleware, compose } from 'redux'
import Reducer from '../reducers'

declare var window: any

const middlewares: any[] = []

let store = createStore(
  Reducer,
  compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export default store

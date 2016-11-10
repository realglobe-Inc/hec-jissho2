import { createStore, applyMiddleware, compose } from 'redux'
// import thunkMiddleware from 'redux-thunk'
import Reducer from '../reducers'

// const middlewares = [thunkMiddleware]
const middlewares: any[] = []

let store = createStore(
  Reducer,
  compose(
    applyMiddleware(...middlewares),
    // window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

export default store

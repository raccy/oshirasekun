import {env} from 'process'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {electronEnhancer} from 'redux-electron-store'
import {reducer, initialState} from './reducers'

logger = createLogger()
middleware = if env.NODE_ENV is 'development'
  [thunk, logger]
else
  [thunk]

enhancer = compose(
  applyMiddleware(middleware...)
  electronEnhancer(dispatchProxy: (a) -> store.dispatch(a))
)

store = createStore(reducer, initialState, enhancer)
export default store

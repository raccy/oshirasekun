import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {electronEnhancer} from 'redux-electron-store'
import {reducer, initialState} from './reducers'

logger = createLogger()
middleware = [thunk, logger]

enhancer = compose(
  applyMiddleware(middleware...),
  electronEnhancer({
    dispatchProxy: (a) -> store.dispatch(a)
  })
)

store = createStore(reducer, initialState, enhancer)
export default store

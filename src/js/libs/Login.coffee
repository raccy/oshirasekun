import R from 'ramda'
import {Store} from 'redux'
import {AppState} from '../reducers'
import {loginStart, loginDone} from '../actions'

dummyLoginPromise = ({username, password, option}) ->
  new Promise((resolve, reject) ->
    sleep = if option.sleep then option.sleep else 0
    setTimeout ->
      if username? and username is password
        resolve({displayName: username})
      else
        reject(new Error('ユーザー名またはパスワードが違います。'))
    , sleep
  )

export default class Login
  constructor: (@store) ->
    @store.subscribe =>
      state = @store.getState()
      if state.auth.status is 'prepared'
        @start(state.auth)

  start: (auth) ->
    @store.dispatch(loginStart())
    promise = R.cond([
      [R.propEq('method', 'dummy'), dummyLoginPromise],
      [R.T, (_s) -> Promise.reject(new Error('実装されていないメソッドです。'))]
    ])(auth)
    .then((value) => @store.dispatch(loginDone(value)))
    .catch((reason) =>
      err = R.cond([
        [((r) -> r instanceof Error), R.identity],
        [R.T, (r) -> new Error(r.toString())]
      ])(reason)
      @store.dispatch(loginDone(err))
    )

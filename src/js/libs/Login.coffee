import {loginStart, loginDone} from '../actions'
import {reset} from 'redux-form'

export default class Login
  constructor: (@store) ->
    @store.subscribe =>
      state = @store.getState()
      @start(state.auth) if state.auth.status is 'prepared'

  start: (auth) ->
    # ログイン処理開始の通知
    @store.dispatch(loginStart())
    # ログイン処理
    loginPromise = switch auth.method
      when 'dummy'
        @dummyLoginPromise(auth)
      else
        Promise.reject(new Error('実装されていないメソッドです。'))
    # ログイン処理実行後の通知
    loginPromise
    .then (value) =>
      @store.dispatch(loginDone(value))
    .catch (reason) =>
      err = if reason instanceof Error
        reason
      else
        new Error(reasen.toString())
      @store.dispatch(reset('auth'))
      @store.dispatch(loginDone(err))

  # ldap LDAPの認証を行う。
  ldapLoginPromise: ({username, password, option}) ->
    Promise.reject(new Error('実装されていないメソッドです。'))
  # ad ADの認証を行う。
  adLoginPromise: ({username, password, option}) ->
    Promise.reject(new Error('実装されていないメソッドです。'))
  # mount pathにマウントまたは接続を行う。
  mountLoginPromise: ({username, password, option}) ->
    Promise.reject(new Error('実装されていないメソッドです。'))
  # web 特定サイトにWeb認証する。BASIC認証のみ対応。
  # command コマンドを実行する。コマンドが成功すれば良い。
  # dummy ユーザ名とパスワードが同じなら何でも通るテスト用のダミー

  # dummy ユーザ名とパスワードが同じなら何でも通るテスト用のダミー
  dummyLoginPromise: ({username, password, option}) ->
    new Promise((resolve, reject) ->
      sleep = if option.sleep then option.sleep else 0
      setTimeout ->
        if username? and username is password
          resolve displayName: username
        else
          reject new Error('ユーザー名またはパスワードが違います。')
      , sleep
    )

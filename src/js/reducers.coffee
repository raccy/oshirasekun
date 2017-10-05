import R from 'ramda'
import {combineReducers} from 'redux'
import {handleActions, handleAction} from 'redux-actions'
import {reducer as formReducer} from 'redux-form'
import * as Actions from './actions'

###
認証メソッドを示すストリングリテラル型
それぞれは下記の意味
- "ldap" LDAP認証
- "ad" AD認証
- "mount" ファイル共有マウント
- "web" Web BASIC認証
- "command" 任意のコマンド
- "dummy" ダミー、テスト用
- "none" 認証無し、ログイン不可
- "local" ローカル認証

テキストのタイプ
- "plain" プレーンテキスト
- "text" プレーンテキスト
- "markdown" マークダウン
- "gfm" GitHub フレーバー マークダウン
- "asciidoc" Asciidoc
- "review" ReVIEW
- "textile" Textile
- "html" HTML
###

initialMode =
  debug: false

initialConfig =
  loaded: false

initialAuth =
  required: true
  status: 'none'
  method: 'none'

initialNews =
  show: true
  loaded: false
  type: 'plain'
  encode: 'UTF-8'

export initialState =
  mode: initialMode
  config: initialConfig
  auth: initialAuth
  news: initialNews

mode = handleActions
  "#{Actions.ENABLE_DEBUG_MODE}": (state, action) ->
    debug: true
, initialMode

config = handleActions
  "#{Actions.CONFIG_LOAD}":
    next: (state, action) ->
      R.merge(state, loaded: true, path: action.payload)
    throw: (state, action) ->
      R.merge(state, error: action.payload)
, initialConfig

auth = handleActions
  "#{Actions.AUTH_SETUP}": (state, action) ->
    R.merge state, action.payload
  "#{Actions.LOGIN}": (state, action) ->
    R.mergeAll([state, action.payload, {status: 'prepared'}])
  "#{Actions.LOGIN_START}": (state, action) ->
    R.merge(state, {status: 'during'})
  "#{Actions.LOGIN_DONE}":
    next: (state, action) ->
      # パスワードだけクリア
      R.merge(state,
        password: undefined,
        displayName: action.payload.displayName,
        status: 'done',
        error: undefined
      )
    throw: (state, action) ->
      # ユーザー名とパスワードはクリア
      R.merge(state,
        username: undefined,
        password: undefined,
        status: 'failed',
        error: action.payload
      )
, initialAuth

news = handleActions
  "#{Actions.NEWS_SETUP}": (state, action) -> R.merge(state, action.payload)
  "#{Actions.NEWS_LOAD}":
    next: (state, action) ->
      R.mergeAll([state, action.payload, {loaded: true}])
    throw: (state, action) ->
      R.merge(state, {error: action.payload})
, initialNews

export reducer = combineReducers({
  mode,
  config,
  auth,
  form: formReducer
})

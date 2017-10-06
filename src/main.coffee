import path from 'path'
import {app} from 'electron'
import optParse from './js/libs/optParse'
import Config from './js/libs/Config'
import Login from './js/libs/Login'
import store from './js/stores'
import {enableDebugMode} from './js/actions'
import MainApp from './js/MainApp'

# エラー発生時に閉じる
store.subscribe ->
  error = store.getState().config.error
  if error?
    console.error("#{error.name}:  #{error.message}")
    app.exit(1)

# コマンドラインオプション解析
opt = optParse()
if opt.options.debug
  store.dispatch(enableDebugMode())

# メイン起動
configFile = path.resolve(opt.options.config or app.getName() + '.yml')
config = new Config(configFile, store)
login = new Login(store)
mainApp = new MainApp(app, opt, store)

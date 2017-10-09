import path from 'path'
import {app} from 'electron'

import optParse from './js/libs/optParse'
import Config from './js/libs/Config'
import Login from './js/libs/Login'
import News from './js/libs/News'

import store from './js/stores'
import {enableDebugMode} from './js/actions'
import MainApp from './js/MainApp'

# コマンドラインオプション解析
opt = optParse()
if opt.options.debug
  store.dispatch(enableDebugMode())

# メイン起動
configFile = path.resolve(opt.options.config or app.getName() + '.yml')
config = new Config(store, configFile)

config.on 'error', (error) ->
  console.error("#{error.name}:  #{error.message}")
  app.exit(1)

login = new Login(store)
news = new News(store)
mainApp = new MainApp(app, opt, store)

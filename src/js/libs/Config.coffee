import {readFile} from 'fs'
import {normalize, dirname} from 'path'
import EventEmitter from 'events'
import {URL} from 'url'
import {safeLoad} from 'js-yaml'
import {configLoad, authSetup, newsSetup} from '../actions'

# コンフィグクラス
# 設定ファイルはYAML形式
export default class Config extends EventEmitter
  constructor: (@store, configPath) ->
    super()
    @localPath = normalize(configPath)
    @type = 'local'
    @path = @localPath
    @fallback = true
    @loadConfig(@localPath)

  loadConfig: (path) ->
    readFile path, 'utf8', (err, data) =>
      if err
        @loadError(err)
      else
        try
          @loadData(safeLoad(data))
        catch loadDataError
          @loadError(loadDataError)

  loadError: (error) ->
    if @type is 'remote' and @fallback
      @emit('fallback')
    else
      @store.dispatch(configLoad(error))
      @emit('error', error)

  loadData: (config) ->
    if @type is 'local' and config.control.type is 'remote'
      @type = 'remote'
      @fallback = config.control.fallback
      @on 'fallback', =>
        @path = @localPath
        @type = 'fallback'
        @loadData(config)
      try
        @path = new URL(config.control.remote)
      catch urlParseError
        @loadError(urlParseError)
      @loadConfig(@path)
    else
      @dir = @parrentDir(@path)
      @store.dispatch(configLoad(
        type: @type
        path: @path.toString()
        dir: @dir.toString()
      ))
      @store.dispatch(authSetup(config.startScreen.auth))
      @store.dispatch(newsSetup(config.startScreen.news))
      @emit('load', @)

  parrentDir: (path) ->
    if path instanceof URL
      new URL('.', path)
    else
      dirname(path)

import { readFile } from "fs"
import { normalize } from "path"
import url from "url"
import R from "ramda"
import { safeLoad } from "js-yaml"
import { Store } from "redux"
import { AppState } from "../reducers"
import { configLoad, authSetup } from "../actions"

###
コンフィグクラス
設定ファイルはYAML形式
###
export default class Config
  constructor: (filePath, @store) ->
    @done = false
    @path = null
    @filePath = null
    @filePath = normalize(filePath)
    @loadFile(@filePath)

  loadFile: (filePath) ->
    readFile(filePath, "utf8", (err, data) =>
      if err
        @store.dispatch(configLoad(err))
        return
      try
        @loadData(safeLoad(data))
      catch e
        @store.dispatch(configLoad(e))
    )

  loadData: (config) ->
    @store.dispatch(authSetup(config.startScreen.auth))
    @store.dispatch(configLoad(@path))

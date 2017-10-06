import electron from 'electron'
import R from 'ramda'
import Redux from 'redux'
import {AppState} from './reducers'
import {Options} from './libs/optParse'

export default class MainApp
  constructor: (@app, @opt, @store) ->
    @startScreenWindow = null
    @app.on('window-all-closed', => @onWindowAllClosed())
    @app.on('ready', => @onReady())

  onWindowAllClosed: ->
    @app.quit()

  onReady: ->
    startScreemWindow =
      width: 1024
      height: 768
      minWidth: 1024 # must be larger than XGA width
      minHeight: 768 # must be larger than XGA height
      resizable: false
      movable: false
      minimizable: false
      closable: false
      alwaysOnTop: true
      fullscreen: true
      kiosk: true
      title: 'お知らせ君'
      frame: false
      transparent: true
      titleBarStyle: 'hidden'
      acceptFirstMouse: true

    if @opt.options.debug
      startScreemWindow = R.merge(startScreemWindow,
        movable: true
        closable: true
        alwaysOnTop: false
        fullscreen: false
        kiosk: false
        frame: true
      )

    @startScreenWindow = new electron.BrowserWindow(startScreemWindow)

    @startScreenWindow.loadURL('file://' + __dirname +
      '/../html/start_screen.html')

    @startScreenWindow.on 'closed', =>
      @startScreenWindow = null

    unless @opt.options.debug
      @startScreenWindow.on 'blur', =>
        @focusstartScreenWindow()

    if @opt.options.debug
      @startScreenWindow.webContents.openDevTools()

    electron.globalShortcut.register 'CmdOrCtrl+Alt+O', =>
      console.log('Froce to close!')
      @startScreenWindow?.setClosable(true)
      @startScreenWindow?.close()

  focusstartScreenWindow: ->
    console.log('Force to focus Main Window!')
    # FIXME: Windows 10 ではフォーカスが設定されない。
    # https://github.com/electron/electron/issues/2867
    if process.platform is 'win32'
      # Windows 10 では一度minimizeしないとフォーカスが取れない。
      @startScreenWindow?.minimize()
      @startScreenWindow?.setFullScreen(true)
      @startScreenWindow?.focus()
      # スタートメニューは連続して取ろうとするため、
      #  確認後に再度奪われていれば設定する。
      setTimeout =>
        unless @startScreenWindow?.isFocused()
          @focusstartScreenWindow()
      , 1000
    else
      @startScreenWindow?.focus()

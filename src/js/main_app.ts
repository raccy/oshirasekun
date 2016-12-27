import * as electron from "electron";
import * as R from "ramda";
import * as Redux from "redux";
import { AppState } from "./reducers";
import { Options } from "./opt_parse";
// import { setDebugMode } from "./actions";

export default class MainApp {
    private startScreenWindow: Electron.BrowserWindow = null;
    private hoge: AppState;

    constructor(public app: Electron.App, private opt: Options, private store: Redux.Store<AppState>) {
        this.app.on("window-all-closed", () => this.onWindowAllClosed());
        this.app.on("ready", () => this.onReady());
    }

    onWindowAllClosed() {
        this.app.quit();
    }

    onReady() {
        let startScreemWindow: Electron.BrowserWindowOptions = {
            width: 1024,
            height: 768,
            minWidth: 1024, // must be larger than XGA width
            minHeight: 768, // must be larger than XGA height
            resizable: false,
            movable: false,
            minimizable: false,
            closable: false,
            alwaysOnTop: true,
            fullscreen: true,
            kiosk: true,
            title: "お知らせ君",
            frame: false,
            transparent: true,
            titleBarStyle: "hidden",
            acceptFirstMouse: true
        };
        if (this.opt.options.debug) {
            startScreemWindow = R.merge(startScreemWindow, {
                movable: true,
                closable: true,
                alwaysOnTop: false,
                fullscreen: false,
                kiosk: false,
                frame: true
            });
        }

        this.startScreenWindow = new electron.BrowserWindow(startScreemWindow);

        this.startScreenWindow.loadURL("file://" + __dirname + "/../html/index.html");

        this.startScreenWindow.on("closed", () => {
            this.startScreenWindow = null;
        });

        if (!this.opt.options.debug) {
            this.startScreenWindow.on("blur", () => {
                this.focusstartScreenWindow();
            });
        }

        if (this.opt.options.debug) {
            this.startScreenWindow.webContents.openDevTools();
        }

        electron.globalShortcut.register("CmdOrCtrl+Alt+O", () => {
            console.log("Froce to close!");
            this.startScreenWindow.setClosable(true);
            this.startScreenWindow.close();
        });

    }

    focusstartScreenWindow() {
        console.log("Force to focus Main Window!");
        // FIXME: Windows 10 ではフォーカスが設定されない。
        // https://github.com/electron/electron/issues/2867
        if (process.platform === "win32") {
            // Windows 10 では一度minimizeしないとフォーカスが取れない。
            this.startScreenWindow.minimize();
            this.startScreenWindow.setFullScreen(true);
            this.startScreenWindow.focus();
            // スタートメニューは連続して取ろうとするため、
            //  確認後に再度奪われていれば設定する。
            setTimeout(() => {
                if (!this.startScreenWindow.isFocused()) {
                    this.focusstartScreenWindow();
                }
            }, 1000);
        } else {
            this.startScreenWindow.focus();
        }
    }
}

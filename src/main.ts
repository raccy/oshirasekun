import * as electron from "electron";

class MainApplication {
    mainWindow: Electron.BrowserWindow = null;

    constructor(public app: Electron.App) {
        this.app.on("window-all-closed", () => this.onWindowAllClosed());
        this.app.on("ready", this.onReady);
    }

    onWindowAllClosed() {
        this.app.quit();
    }

    onReady() {
        this.mainWindow = new electron.BrowserWindow({
            // width: 1024,
            // height: 768,
            // minWidth: 1024, // must be larger than XGA width
            // minHeight: 768, // must be larger than XGA height
            resizable: false,
            movable: false,
            minimizable: false,
            // closable: false,
            alwaysOnTop: true,
            fullscreen: true,
            kiosk: true,
            title: "お知らせ君",
            frame: false,
            transparent: true,
            // titleBarStyle: "hidden",
            acceptFirstMouse: true
        });

        this.mainWindow.loadURL("file://" + __dirname + "/index.html");

        this.mainWindow.on("closed", () => {
            this.mainWindow = null;
        });

        this.mainWindow.on("blur", () => {
            console.log("Force to focus Main Window!");
            // FIXME: Macだと下記方法でいけるけど、Win10はだめ？
            // this.mainWindow.focus();
        });

        electron.globalShortcut.register("Cmd+Q", () => {
            console.log("on Command Q key!");
            this.mainWindow.close();
        });
    }
}

const mainApp = new MainApplication(electron.app);

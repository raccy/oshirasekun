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
            // width: 800,
            // height: 400,
            // minWidth: 500,
            // minHeight: 200,
            // kiosk: true,
            fullscreen: true,
            frame: false,
            transparent: true,
            resizable: false,
            alwaysOnTop: true,
            // titleBarStyle: "hidden"
            acceptFirstMouse: true
        });

        this.mainWindow.loadURL("file://" + __dirname + "/index.html");

        this.mainWindow.on("closed", () => {
            this.mainWindow = null;
        });
    }
}

const mainApp = new MainApplication(electron.app);

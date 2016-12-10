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
            width: 1024,
            height: 768,
            minWidth: 1024, // must be larger than XGA width
            minHeight: 768, // must be larger than XGA height
            // kiosk: true,
            // fullscreen: true,
            frame: false,
            resizable: false,
            alwaysOnTop: true,
            // titleBarStyle: "hidden"
            transparent: true,
            acceptFirstMouse: true
        });

        this.mainWindow.loadURL("file://" + __dirname + "/index.html");

        this.mainWindow.on("closed", () => {
            this.mainWindow = null;
        });
    }
}

const mainApp = new MainApplication(electron.app);

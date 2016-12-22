import * as electron from "electron";

const package_info = `${electron.app.getName()} ${electron.app.getVersion()}`;

const Getopt = require("node-getopt");
const opt = Getopt.create([
    ['d', 'debug', 'debug mode'],
    ['h', 'help', 'display this help'],
    ['v', 'version', 'show version']
])
    .bindHelp(`${package_info}\nUsage: oshirasekun [options]\n\n[[OPTIONS]]\n`)
    .parseSystem();

if (opt.options.version) {
    console.info(package_info);
    electron.app.quit();
}



class MainApplication {
    mainWindow: Electron.BrowserWindow = null;

    constructor(public app: Electron.App) {
        this.app.on("window-all-closed", () => this.onWindowAllClosed());
        this.app.on("ready", () => this.onReady());
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
            //
            // transparent: true,
            // titleBarStyle: "hidden",
            acceptFirstMouse: true
        });

        this.mainWindow.loadURL("file://" + __dirname + "/index.html");

        this.mainWindow.on("closed", () => {
            this.mainWindow = null;
        });

        this.mainWindow.on("blur", () => {
            this.focusMainWindow();
            // console.log("Force to focus Main Window!");
            // // FIXME: Windows 10 ではフォーカスが設定されない。
            // // https://github.com/electron/electron/issues/2867
            // if (process.platform === "win32") {
            //     // Windows 10 では一度minimizeしないとフォーカスが取れない。
            //     this.mainWindow.minimize();
            //     this.mainWindow.focus();
            //     // スタートメニューは連続して取ろうとする。
            //     setTimeout(() => {
            //         if (!this.mainWindow.isFocused()) {
            //             this.mainWindow.minimize();
            //             this.mainWindow.focus();
            //         }
            //     }, 1000);
            // } else {
            //     this.mainWindow.focus();
            // }
        });

        electron.globalShortcut.register("CmdOrCtrl+Alt+O", () => {
            console.log("Froce to close!");
            this.mainWindow.close();
        });
    }

    focusMainWindow() {
        console.log("Force to focus Main Window!");
        // FIXME: Windows 10 ではフォーカスが設定されない。
        // https://github.com/electron/electron/issues/2867
        if (process.platform === "win32") {
            // Windows 10 では一度minimizeしないとフォーカスが取れない。
            this.mainWindow.minimize();
            this.mainWindow.focus();
            // スタートメニューは連続して取ろうとするため、
            //  確認後に再度奪われていれば設定する。
            setTimeout(() => {
                if (!this.mainWindow.isFocused()) {
                    this.focusMainWindow();
                }
            }, 1000);
        } else {
            this.mainWindow.focus();
        }
    }
}

const mainApp = new MainApplication(electron.app);

import * as electron from "electron";

const package_info = `${electron.app.getName()} ${electron.app.getVersion()}`;

const Getopt = require("node-getopt");
const opt = Getopt.create([
    ["d", "debug", "debug mode"],
    ["h", "help", "display this help"],
    ["v", "version", "show version"]
])
    .bindHelp(`${package_info}\nUsage: oshirasekun [options]\n\n[[OPTIONS]]\n`)
    .on("version", () => {
        console.info(package_info);
        electron.app.quit();
    })
    .parseSystem();

class MainApplication {
    startScreenWindow: Electron.BrowserWindow = null;

    constructor(public app: Electron.App, public debug: boolean) {
        this.app.on("window-all-closed", () => this.onWindowAllClosed());
        this.app.on("ready", () => this.onReady());
    }

    onWindowAllClosed() {
        this.app.quit();
    }

    onReady() {
        this.startScreenWindow = new electron.BrowserWindow({
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

        this.startScreenWindow.loadURL("file://" + __dirname + "/index.html");

        this.startScreenWindow.on("closed", () => {
            this.startScreenWindow = null;
        });

        this.startScreenWindow.on("blur", () => {
            this.focusstartScreenWindow();
            // console.log("Force to focus Main Window!");
            // // FIXME: Windows 10 ではフォーカスが設定されない。
            // // https://github.com/electron/electron/issues/2867
            // if (process.platform === "win32") {
            //     // Windows 10 では一度minimizeしないとフォーカスが取れない。
            //     this.startScreenWindow.minimize();
            //     this.startScreenWindow.focus();
            //     // スタートメニューは連続して取ろうとする。
            //     setTimeout(() => {
            //         if (!this.startScreenWindow.isFocused()) {
            //             this.startScreenWindow.minimize();
            //             this.startScreenWindow.focus();
            //         }
            //     }, 1000);
            // } else {
            //     this.startScreenWindow.focus();
            // }
        });

        electron.globalShortcut.register("CmdOrCtrl+Alt+O", () => {
            console.log("Froce to close!");
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

const mainApp = new MainApplication(electron.app, opt.options.debug);

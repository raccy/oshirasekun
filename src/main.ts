import * as path from "path";
import { app } from "electron";

import optParse from "./js/opt_parse";
import store from "./js/stores";
import { enableDebugMode } from "./js/actions";
import Config from "./js/config";
import MainApp from "./js/main_app";

// エラー発生時に閉じる
store.subscribe(() => {
    const state = store.getState();
    const error = state.config.error;
    if (error) {
        console.error(`${error.name}:  ${error.message}`);
        app.exit(1);
    }
});

const opt = optParse();

if (opt.options.debug) {
    store.subscribe(() => {
        console.log(store.getState());
    });
    store.dispatch(enableDebugMode());
}

const configFile = path.resolve(opt.options.config || app.getName() + ".yml");
const config = new Config(configFile, store);

const mainApp = new MainApp(app, opt, store);

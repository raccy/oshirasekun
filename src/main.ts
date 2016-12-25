import { app } from "electron";

import optParse from "./js/opt_parse";
import store from "./js/store";
import { setDebugMode } from "./js/actions";
import MainApp from "./js/main_app";

const opt = optParse();
if (opt.options.debug) {
    store.dispatch(setDebugMode(true));
}
const mainApp = new MainApp(app, opt, store);

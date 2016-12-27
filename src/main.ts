import { app } from "electron";

import optParse from "./js/opt_parse";
import store from "./js/stores";
import { enableDebugMode } from "./js/actions";
import MainApp from "./js/main_app";

const opt = optParse();
if (opt.options.debug) {
    store.dispatch(enableDebugMode());
}
const mainApp = new MainApp(app, opt, store);

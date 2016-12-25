import * as jQuery from "jquery";
const $ = jQuery;
(<any>window).jQuery = (<any>window).$ = jQuery;
import * as Tether from "tether";
(<any>window).Tether = Tether;
require("bootstrap"); // no types

import * as React from "react";
import * as ReactDOM from "react-dom";
import Main from "./components/main";

import { createStore, applyMiddleware, compose } from "redux";
const ReduxElectronStore = require("redux-electron-store"); // no typess
const electronEnhancer = ReduxElectronStore.electronEnhancer;
import reducer from "./reducers";
// import { setDebugMode } from "./lib/actions";

// Redux Store
const filter = {
    mode: true
};
const enhancer = electronEnhancer({
    filter,
    dispachProxy: a => store.dispatch(a)
});
const store = createStore(reducer, {}, enhancer);

const mainContent = document.getElementById("main");
ReactDOM.render(React.createElement(Main, null), mainContent);

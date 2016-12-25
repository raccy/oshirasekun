import { createStore, applyMiddleware, compose } from "redux";
const ReduxElectronStore = require("redux-electron-store"); // no typess
const electronEnhancer = ReduxElectronStore.electronEnhancer;
import { reducer, initialState, AppState } from "./reducers";

const enhancer = electronEnhancer({
    dispachProxy: a => store.dispatch(a)
});
const store = createStore<AppState>(reducer, initialState, enhancer);

export default store;
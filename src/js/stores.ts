import { createStore, applyMiddleware, compose, Middleware, Store } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
const electronEnhancer = require("redux-electron-store").electronEnhancer; // no typess
import { reducer, initialState, AppState } from "./reducers";

const logger = createLogger();
const middleware: Middleware[] = [thunk, logger];

const enhancer = <any>compose(
    applyMiddleware(...middleware),
    electronEnhancer({
        dispatchProxy: a => store.dispatch(a),
    })
);

const store = createStore<AppState>(reducer, initialState, enhancer);
export default store;

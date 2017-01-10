import { createStore, applyMiddleware, compose, Middleware, Store } from "redux";
const ReduxElectronStore = require("redux-electron-store"); // no typess
const electronEnhancer = ReduxElectronStore.electronEnhancer;
import { reducer, initialState, AppState } from "./reducers";
import thunk from "redux-thunk";
import * as createLogger from "redux-logger";

// const filter = {
//     mode: true
// };
const logger = createLogger();
const middleware: Middleware[] = [thunk, logger];

const enhancer = <any>compose(
    applyMiddleware(...middleware),
    electronEnhancer({
        dispatchProxy: a => store.dispatch(a),
    })
);

// const enhancer = electronEnhancer({
//     dispatchProxy: a => store.dispatch(a),
// });

// const enhancerWithFilter = electronEnhancer({
//     filter,
//     dispatchProxy: a => storeWithFilter.dispatch(a)
// });
const store = createStore<AppState>(reducer, initialState, enhancer);
export default store;

// export const storeWithFilter = createStore<AppState>(reducer, initialState, enhancerWithFilter);

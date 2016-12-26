import { createStore, applyMiddleware, compose, Middleware } from "redux";
const ReduxElectronStore = require("redux-electron-store"); // no typess
const electronEnhancer = ReduxElectronStore.electronEnhancer;
import { reducer, initialState, AppState } from "./reducers";
import thunk from "redux-thunk";

// const filter = {
//     mode: true
// };
const middleware: Middleware[] = [thunk];

const enhancer = compose<AppState, any>(
    thunk,
    electronEnhancer({
        dispatchProxy: a => store.dispatch(a),
    })
);

// const enhancerWithFilter = electronEnhancer({
//     filter,
//     dispatchProxy: a => storeWithFilter.dispatch(a)
// });
export const store = createStore<AppState>(reducer, initialState, enhancer);

// export const storeWithFilter = createStore<AppState>(reducer, initialState, enhancerWithFilter);

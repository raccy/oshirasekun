import * as R from "ramda";
import { combineReducers } from "redux";
import { ENABLE_DEBUG_MODE, configLoad } from "./actions";
import { handleActions, handleAction } from "redux-actions";
import { reducer as formReducer } from "redux-form";

interface ModeState {
    debug: boolean;
}

interface ConfigState {
    loaded: boolean;
    error: Error;
}

export interface AppState {
    mode: ModeState;
    config: ConfigState;
}

const initialMode: ModeState = {
    debug: false,
};

const initialConfig: ConfigState = {
    loaded: false,
    error: null
};

export const initialState: AppState = {
    mode: initialMode,
    config: initialConfig
};

const mode = handleActions({
    ENABLE_DEBUG_MODE: (state, action) => ({ debug: true })
}, initialMode);

const config = handleActions<ConfigState, boolean | Error>({
    CONFIG_LOAD: {
        next(state, action) {
            return R.merge(state, { loaded: action.payload })
        },
        throw(state, action) {
            return R.merge(state, { error: action.payload })
        }
    }
}, initialConfig);

export const reducer = combineReducers<AppState>({
    mode,
    config,
    form: formReducer
});

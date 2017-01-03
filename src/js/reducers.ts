import * as R from "ramda";
import { combineReducers } from "redux";
import { ENABLE_DEBUG_MODE } from "./actions";
import { handleActions } from "redux-actions";

interface ModeState {
    debug: boolean;
}

interface ConfigState {
    loaded: boolean;
}

export interface AppState {
    mode: ModeState;
    config: ConfigState;
}

const initialMode: ModeState = {
    debug: false
};

const initialConfig: ConfigState = {
    loaded: false
};

export const initialState: AppState = {
    mode: initialMode,
    config: initialConfig
};

const mode = handleActions({
    ENABLE_DEBUG_MODE: (state, action) => ({ debug: true })
}, initialMode);

export const reducer = combineReducers<AppState>({
    mode,
});

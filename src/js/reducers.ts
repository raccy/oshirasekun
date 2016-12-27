import * as R from "ramda";
import { combineReducers } from "redux";
import { ENABLE_DEBUG_MODE } from "./actions";
import { handleActions } from "redux-actions";

interface ModeState {
    debug: boolean;
}

export interface AppState {
    mode: ModeState;
}

const initialMode: ModeState = {
    debug: false
};

export const initialState: AppState = {
    mode: initialMode
};

const mode = handleActions({
    ENABLE_DEBUG_MODE: (state, action) => ({ debug: true })
}, initialMode);

export const reducer = combineReducers<AppState>({
    mode,
});

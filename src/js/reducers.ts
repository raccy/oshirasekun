import * as R from "ramda";
import { combineReducers } from "redux";
import { SET_DEBUG_MODE } from "./actions";
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
    SET_DEBUG_MODE: (state, action) => ({ debug: action.payload.debug })
}, initialMode);

export const reducer = combineReducers<AppState>({
    mode,
});

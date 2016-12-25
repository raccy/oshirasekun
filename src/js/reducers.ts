import * as R from "ramda";
import { combineReducers } from "redux";
import { TYPE } from "./actions";

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

const mode = (state = initialMode, action) => {
    switch (action.type) {
        case TYPE.SET_DEBUG_MODE:
            return R.merge(state, { debug: action.flag });
        default:
            return state;
    }
};

export const reducer = combineReducers<AppState>({
    mode,
});

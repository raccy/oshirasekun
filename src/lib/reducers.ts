import * as R from "ramda";
import { combineReducers } from "redux";
import { TYPE } from "./actions";

const initialMode = {
    debug: false
};

const mode = (state = initialMode, action) => {
    switch (action.type) {
        case TYPE.SET_DEBUG_MODE:
            return R.merge(state, { debug: action.flag });
        default:
            return state;
    }
};

export default combineReducers({
    mode,
});

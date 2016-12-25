
export const SET_DEBUG_MODE = "SET_DEBUG_MODE";

export function setDebugMode(flag: boolean) {
    return { type: SET_DEBUG_MODE, flag };
}

export const TYPE = {
    SET_DEBUG_MODE
};

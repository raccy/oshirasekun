import { createAction } from "redux-actions";

// Mode
export const ENABLE_DEBUG_MODE = "ENABLE_DEBUG_MODE";
export const enableDebugMode = createAction(ENABLE_DEBUG_MODE);

// Config
export const CONFIG_LOAD = "CONFIG_LOAD";
export const configLoad = createAction<any>(CONFIG_LOAD);

// Auth
export const AUTH_SETUP = "AUTH_SETUP";
export const authSetup = createAction<any>(AUTH_SETUP);

export const LOGIN = "LOGIN";
export const login = createAction<any>(LOGIN);

export const LOGIN_START = "LOGIN_START";
export const loginStart = createAction(LOGIN_START);

export const LOGIN_DONE = "LOGIN_DONE";
export const loginDone = createAction<any>(LOGIN_DONE);

export const NEWS_SETUP = "NEWS_SETUP";
export const newsSetup = createAction(NEWS_SETUP);

export const NEWS_LOAD = "NEWS_LOAD";
export const newsLoad = createAction(NEWS_LOAD);

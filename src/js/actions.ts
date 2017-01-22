import { createAction } from "redux-actions";

// Mode
export const ENABLE_DEBUG_MODE = "ENABLE_DEBUG_MODE";
export const enableDebugMode = createAction(ENABLE_DEBUG_MODE);

// Config
export const CONFIG_LOAD = "CONFIG_LOAD";
export const configLoad = createAction(CONFIG_LOAD);

// Auth
export const AUTH_SETUP = "AUTH_SETUP";
export const authSetup = createAction(AUTH_SETUP);

export const LOGIN = "LOGIN";
export const login = createAction(LOGIN);

export const LOGIN_START = "LOGIN_START";
export const loginStart = createAction(LOGIN_START);

export const LOGIN_DONE = "LOGIN_DONE";
export const loginDone = createAction(LOGIN_DONE);

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


// export const LOGIN_PROCESS_COMPLETED = "LOGIN_PROCESS_COMPLETED";
// export const loginProcessCompleted = createAction(LOGIN_PROCESS_COMPLETED);
//
// export const POST_LOGIN_PROCESS_COMPLETED = "POST_LOGIN_PROCESS_COMPLETED";
// export const postLoginProcessCompleted = createAction(POST_LOGIN_PROCESS_COMPLETED);
// export const SHUTDOWN = "SHUTDOWN";
// export const shutdown = createAction(SHUTDOWN);
//
// export const CLOSE_NEWS = "CLOSE_NEWS";
// export const closeNews = createAction(CLOSE_NEWS);
//
// export const TRANSITION_TO_ADMIN_MODE = "TRANSITION_TO_ADMIN_MODE";
// export const transitionToAdminMode = createAction(TRANSITION_TO_ADMIN_MODE);
//
// export const INPUT_ADMIN_PASSWORD = "INPUT_ADMIN_PASSWORD";
// export const inputAdminPassword = createAction(INPUT_ADMIN_PASSWORD);

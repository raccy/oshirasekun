import { createAction } from "redux-actions";

export const SET_DEBUG_MODE = "SET_DEBUG_MODE";
export const sedDebugMode = createAction(SET_DEBUG_MODE);

// UI Actinons
export const LOGIN_USER = "LOGIN_USER";
export const loginUser = createAction(LOGIN_USER);

export const SHUTDOWN = "SHUTDOWN";
export const shutdown = createAction(SHUTDOWN);

export const CLOSE_NEWS = "CLOSE_NEWS";
export const closeNews = createAction(CLOSE_NEWS);

export const TRANSITION_TO_ADMIN_MODE = "TRANSITION_TO_ADMIN_MODE";
export const transitionToAdminMode = createAction(TRANSITION_TO_ADMIN_MODE);

export const INPUT_ADMIN_PASSWORD = "INPUT_ADMIN_PASSWORD";
export const inputAdminPassword = createAction(INPUT_ADMIN_PASSWORD);

// Background Actions

export const LOGIN_PROCESS_COMPLETED = "LOGIN_PROCESS_COMPLETED";
export const loginProcessCompleted = createAction(LOGIN_PROCESS_COMPLETED);

export const POST_LOGIN_PROCESS_COMPLETED = "POST_LOGIN_PROCESS_COMPLETED";
export const postLoginProcessCompleted = createAction(POST_LOGIN_PROCESS_COMPLETED);

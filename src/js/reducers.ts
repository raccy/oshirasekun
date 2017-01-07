import * as R from "ramda";
import { combineReducers } from "redux";
import { ENABLE_DEBUG_MODE, configLoad } from "./actions";
import { handleActions, handleAction } from "redux-actions";
import { reducer as formReducer } from "redux-form";
import * as url from "url";

interface ModeState {
    debug: boolean;
}

interface ConfigState {
    loaded: boolean;
    error: Error;
}

/**
 * 認証メソッドを示すストリングリテラル型
 * それぞれは下記の意味
 * - "ldap" LDAP認証
 * - "ad" AD認証
 * - "mount" ファイル共有マウント
 * - "web" Web認証
 * - "command" 任意のコマンド
 * - "dummy" ダミー、テスト用
 * - "none" 認証無し、ログイン不可
 * - "local" ローカル認証
 */
type AuthMethod = "ldap" | "ad" | "mount" | "web" | "command" | "dummy" | "none" | "local";

interface AuthState {
    required: boolean;
    loggedIn: boolean;
    username: string | null;
    password: string | null;
    realm: string | null;
    method: AuthMethod;
    path: URL | null;
    option: any;
    error: Error | null;
}

export interface AppState {
    mode: ModeState;
    config: ConfigState;
    auth: AuthState;
}

const initialMode: ModeState = {
    debug: false,
};

const initialConfig: ConfigState = {
    loaded: false,
    error: null
};

const initialAuth: AuthState = {
    required: true,
    loggedIn: false,
    username: null,
    password: null,
    realm: null,
    method: "none",
    path: null,
    option: null,
    error: null
};

export const initialState: AppState = {
    mode: initialMode,
    config: initialConfig,
    auth: initialAuth
};

const mode = handleActions({
    ENABLE_DEBUG_MODE: (state, action) => ({ debug: true })
}, initialMode);

const config = handleActions<ConfigState, boolean | Error>({
    CONFIG_LOAD: {
        next(state, action) {
            return R.merge(state, { loaded: action.payload });
        },
        throw(state, action) {
            return R.merge(state, { error: action.payload });
        }
    }
}, initialConfig);

export const reducer = combineReducers<AppState>({
    mode,
    config,
    form: formReducer
});

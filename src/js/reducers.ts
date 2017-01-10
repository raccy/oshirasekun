import * as R from "ramda";
import { combineReducers } from "redux";
import { ENABLE_DEBUG_MODE, CONFIG_LOAD, LOGIN, LOGIN_COMPLETED } from "./actions";
import { handleActions, handleAction } from "redux-actions";
import { reducer as formReducer } from "redux-form";
import * as url from "url";

interface ModeState {
    debug: boolean;
}

interface ConfigState {
    loaded: boolean;
    path?: URL | string;
    error?: Error;
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
    authenticated: boolean;
    username?: string;
    password?: string;
    realm?: string;
    method: AuthMethod;
    path?: url.Url | string;
    option?: any;
    error?: Error;
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
    loaded: false
};

const initialAuth: AuthState = {
    required: true,
    authenticated: false,
    method: "none",
};

export const initialState: AppState = {
    mode: initialMode,
    config: initialConfig,
    auth: initialAuth
};

const mode = handleActions({
    [ENABLE_DEBUG_MODE]: (state, action) => ({ debug: true })
}, initialMode);

const config = handleActions<ConfigState, string | Error>({
    [CONFIG_LOAD]: {
        next(state, action) {
            return R.merge(state, { loaded: true, path: action.payload });
        },
        throw(state, action) {
            return R.merge(state, { error: action.payload });
        }
    }
}, initialConfig);

const auth = handleActions<AuthState, any | Error>({
    [LOGIN]: (state, action) => R.merge(state, {
        username: action.payload.username,
        password: action.payload.password
    }),
    [LOGIN_COMPLETED]: {
        next(state, action) {
            return R.merge(state, {
                authenticated: true,
            });
        },
        throw(state, action) {
            // ユーザー名とパスワードは初期化する。
            return R.merge(state, {
                username: undefined,
                password: undefined,
                error: action.payload
            });
        }
    }
}, initialAuth);

export const reducer = combineReducers<AppState>({
    mode,
    config,
    auth,
    form: formReducer
});

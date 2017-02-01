import * as R from "ramda";
import { combineReducers } from "redux";
import { handleActions, handleAction } from "redux-actions";
import { reducer as formReducer } from "redux-form";
import * as Actions from "./actions";

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
 * - "web" Web BASIC認証
 * - "command" 任意のコマンド
 * - "dummy" ダミー、テスト用
 * - "none" 認証無し、ログイン不可
 * - "local" ローカル認証
 */
type AuthMethod = "ldap" | "ad" | "mount" | "web" | "command" | "dummy" | "none" | "local";
type AuthenticationStatus = "none" | "prepared" | "during" | "done" | "failed";

interface AuthState {
    required: boolean;
    status: AuthenticationStatus;
    username?: string;
    password?: string;
    displayName?: string;
    realm?: string;
    method: AuthMethod;
    path?: string | URL;
    option?: any;
    error?: Error;
}

type NewsType = "plain" | "text" | "markdown" | "gfm" | "asciidoc" | "review" | "textile" | "html";
interface NewsState {
    show: boolean;
    loaded: boolean;
    type: NewsType;
    encode: string;
    raw?: string;
    html?: string;
    path?: string | URL;
    error?: Error;
}

export interface AppState {
    mode: ModeState;
    config: ConfigState;
    auth: AuthState;
    news: NewsState;
}

const initialMode: ModeState = {
    debug: false,
};

const initialConfig: ConfigState = {
    loaded: false
};

const initialAuth: AuthState = {
    required: true,
    status: "none",
    method: "none"
};

const initialNews: NewsState = {
    show: true,
    loaded: false,
    type: "plain",
    encode: "UTF-8"
};

export const initialState: AppState = {
    mode: initialMode,
    config: initialConfig,
    auth: initialAuth,
    news: initialNews
};

const mode = handleActions({
    [Actions.ENABLE_DEBUG_MODE]: (state, action) => ({ debug: true })
}, initialMode);

const config = handleActions<ConfigState, string | Error>({
    [Actions.CONFIG_LOAD]: {
        next(state, action) {
            return R.merge(state, { loaded: true, path: action.payload });
        },
        throw(state, action) {
            return R.merge(state, { error: action.payload });
        }
    }
}, initialConfig);

const auth = handleActions<AuthState, any | Error>({
    [Actions.AUTH_SETUP]: (state, action) => R.merge(state, action.payload),
    [Actions.LOGIN]: (state, action) => R.mergeAll([state, action.payload, {
        status: "prepared"
    }]),
    [Actions.LOGIN_START]: (state, action) => R.merge(state, {
        status: "during"
    }),
    [Actions.LOGIN_DONE]: {
        next(state, action) {
            // パスワードだけクリア
            return R.merge(state, {
                password: undefined,
                displayName: action.payload.displayName,
                status: "done",
                error: undefined
            });
        },
        throw(state, action) {
            // ユーザー名とパスワードはクリア
            return R.merge(state, {
                username: undefined,
                password: undefined,
                status: "failed",
                error: action.payload
            });
        }
    }
}, initialAuth);

const news = handleActions<NewsState, any | Error>({
    [Actions.NEWS_SETUP]: (state, action) => R.merge(state, action.payload),
    [Actions.NEWS_LOAD]: {
        next(state, action) {
            return R.merge(state, action.payload);
        },
        throw(state, action) {
            return R.merge(state, { error: action.payload });
        }
    }
}, initialNews);

export const reducer = combineReducers<AppState>({
    mode,
    config,
    auth,
    form: formReducer
});

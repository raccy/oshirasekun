import * as R from "ramda";
import { Store } from "redux";
import { AppState } from "../reducers";
import { loginStart, loginDone } from "../actions";

type loginPromise = (auth: { username: string, password: string, option?: any }) => Promise<{ displayName: string }>;

const dummyLoginPromise: loginPromise = ({ username, password, option }) => new Promise((resolve, reject) => {
    const sleep = option.sleep ? option.sleep : 0;
    setTimeout(() => {
        if (username != null && username === password) {
            resolve({ displayName: username });
        } else {
            reject(new Error("ユーザー名またはパスワードが違います。"));
        }
    }, sleep);
});

export default class Login {
    constructor(private store: Store<AppState>) {
        this.store.subscribe(() => {
            const state = this.store.getState();
            if (state.auth.status === "prepared") {
                this.start(state.auth);
            }
        });
    }
    start(auth) {
        this.store.dispatch(loginStart());
        const promise = R.cond([
            [R.propEq("method", "dummy"), dummyLoginPromise],
            [R.T, _s => Promise.reject(new Error("実装されていないメソッドです。"))]
        ])(auth)
            .then(value => { this.store.dispatch(loginDone(value)); })
            .catch(reason => {
                const err = R.cond([
                    [r => r instanceof Error, R.identity],
                    [R.T, r => new Error(r.toString())]
                ])(reason);
                this.store.dispatch(loginDone(err));
            });
    }

}

import * as R from "ramda";
import { Store } from "redux";
import { AppState } from "../reducers";
import { loginStart, loginDone } from "../actions";

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
            [R.propEq("method", "dummy"), ({ username, password }) => new Promise((resolve, reject) => {
                if (username != null && username === password) {
                    resolve({ username, password });
                } else {
                    reject(new Error("ユーザー名またはパスワードが違います。"));
                }
            })],
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

import * as React from "react";

const Auth = () => {
    return (
        <div>
            <form>
                <div className="form-group">
                    <label htmlFor="inputUsername">ユーザー名</label>
                    <input id="inputUsername" className="form-control" type="text" placeholder="username..." />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">ユーザー名</label>
                    <input id="inputPassword" className="form-control" type="text" placeholder="password..." />
                </div>
                <button type="submit" className="btn btn-primary">
                    ログイン
                </button>
                <button type="reset" className="btn btn-default">
                    シャットダウン
                </button>
            </form>
        </div>
    )
}

export default Auth;

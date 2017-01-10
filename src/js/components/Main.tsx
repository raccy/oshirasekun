import * as React from "react";
import Auth from "./Auth";
import { cond, equals, always, T } from "ramda";

const Footer = ({mainMode, handleAuth}) => {
    console.log(mainMode);
    const content = cond([
        [equals("loading"), _s => (
            <div className="alert alert-info" role="alert">
                <strong>
                    <i className="fa fa-spinner fa-pulse fa-fw"></i>
                </strong>
                準備中です。しばらくお待ちください。
            </div>
        )],
        [equals("auth"), _s => (<Auth onSubmit={handleAuth} />)],
        [equals("news"), _s => (<div></div>)],
        [T, _s => (
            <div className="alert alert-danger" role="alert">
                <strong>
                    <i className="fa fa-exclamation-circle"></i>
                </strong>
                不明な状態です。管理者に問い合わせてください。
            </div>
        )]
    ])(mainMode);
    return (
        <main role="main">
            <div className="container-fluid">
                {content}
            </div>
        </main>
    );
};

export default Footer;

import * as React from "react";
import Auth from "./Auth";

const Footer = ({mainMode, handleAuth}) => {
    let content = null;
    switch (mainMode) {
        case "loading":
            content = (
                <div className="alert alert-info" role="alert">
                    <strong>
                        <i className="fa fa-spinner fa-pulse fa-fw"></i>
                    </strong>
                    準備中です。しばらくお待ちください。
                </div>
            );
            break;
        case "auth":
            content = <Auth onSubmit={handleAuth} />;
            break;
        case "news":
            break;
        default:
            content = (
                <div className="alert alert-danger" role="alert">
                    <strong>
                        <i className="fa fa-exclamation-circle"></i>
                    </strong>
                    不明な状態です。管理者に問い合わせてください。
                </div>
            );
    }
    return (
        <main role="main">
            <div className="container">
                {content}
            </div>
        </main>
    );
};

export default Footer;

import * as React from "react";
import { Field, reduxForm } from "redux-form";
import FieldInput from "./FieldInput";

const Auth = ({handleSubmit}) => {
    return (
        <div className="auth">
            <div className="information">
            </div>
            <form onSubmit={handleSubmit}>
                <Field name="username" displayName="ユーザー名" type="text" component={FieldInput} />
                <Field name="password" displayName="パスワード" type="password" component={FieldInput} />
                <div className="row">
                    <div className="offset-2 col-8 text-right">
                        <button className="btn btn-primary ml-1" type="submit">
                            ログイン
                        </button>
                        <button className="btn btn-default ml-1" type="reset">
                            リセット
                        </button>
                    </div>
                </div>
            </form>
        </div >
    );
};

export default reduxForm({
    form: "auth"
})(Auth as any);

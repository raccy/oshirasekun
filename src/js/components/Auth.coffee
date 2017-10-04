import React from "react"
import { Field, reduxForm } from "redux-form"
import FieldInput from "./FieldInput"

Auth = ({inputtable, handleSubmit}) ->
  <div className="auth">
    <div className="information">
    </div>
    <form onSubmit={handleSubmit}>
      <fieldset disabled={not inputtable}>
        <Field name="username" displayName="ユーザー名"
            type="text" component={FieldInput} />
        <Field name="password" displayName="パスワード"
            type="password" component={FieldInput} />
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
      </fieldset>
    </form>
  </div>

export default reduxForm({
  form: "auth"
})(Auth)

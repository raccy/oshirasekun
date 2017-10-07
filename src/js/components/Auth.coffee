import React from 'react'
import {Field, reduxForm} from 'redux-form'
import FieldInput from './FieldInput'

Auth = ({inputtable, authError, handleSubmit, submitting}) ->
  alert =
    if authError
      <div className="col-8 alert alert-danger" role="alert">
        {authError}
      </div>
    else
      <div className="col-8"></div>

  <div className="auth">
    <div className="information">
      <div className="row justify-content-center">
        {alert}
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-8">
        <form onSubmit={handleSubmit}>
          <fieldset disabled={not inputtable}>
            <Field name="username" displayName="ユーザー名" type="text"
              component={FieldInput} />
            <Field name="password" displayName="パスワード"
              type="password" component={FieldInput} />
            <button className="btn btn-primary btn-block" type="submit"
              disabled={submitting}>
              ログイン
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>


validate = (values) ->
  errors = {}
  if not values.username?
    errors.username = '必須項目です。'

  if not values.password?
    errors.password = '必須項目です。'

  return errors

export default reduxForm({form: 'auth', validate}) Auth

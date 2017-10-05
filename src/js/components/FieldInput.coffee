import React from 'react'

FieldInput = ({name, displayName, type, input,
meta: {touched, error, warning}}) ->
  message = if touched
    if error
      <span className="text-danger">{error}</span>
    else if warning
      <span className="text-warning">{warning}</span>
    else
      <span></span>
  <div className="form-group">
    <div className="row">
      <label className="offset-2 col-2 col-form-label" htmlFor={name}>
        {displayName}
      </label>
      <div className="col-6">
        <input className="form-control" type={type}
          placeholder="入力してください ..." {input...} />
      </div>
    </div>
    <div>
      {message}
      &nbsp;
    </div>
  </div>

export default FieldInput

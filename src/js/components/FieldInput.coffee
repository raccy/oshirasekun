import React from 'react'

FieldInput = ({name, displayName, type, input,
meta: {touched, error, warning}}) ->
  console.log(touched)
  [wasValidatedClass, isValidClass, feedbackClass, feedbackText] =
    if touched
      if error?
        ['was-validated', 'is-invalid', '', error]
      else if warnig?
        # 警告がある場合はvalidでもinvalidでも無い。
        ['was-validated', 'is-invalid', 'text-danger', warning]
      else
        ['was-validated', 'is-valid', 'text-success', '　']
    else
      ['', '', '', '　']
  <div className={"form-group #{wasValidatedClass}"}>
    <label htmlFor={name}>
      {displayName}
    </label>
    <input className={"form-control #{isValidClass}"} type={type}
      placeholder="入力してください ..." {input...} required />
    <div className="invalid-feedback" style={display: 'block'}>
      <span className={feedbackClass}>
        {feedbackText}
      </span>
    </div>
  </div>

export default FieldInput

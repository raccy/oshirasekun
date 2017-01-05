import * as React from "react";

const FieldInput = ({name, displayName, type, input, meta: {touched, error, warning}}) => (
    <div className="form-group">
        <div className="row">
            <label className="offset-xs-2 col-xs-2 col-form-label" htmlFor={name}>
                {displayName}
            </label>
            <div className="col-xs-6">
                <input className="form-control" type={type} placeholder={`${displayName} ...`} {...input} />
            </div>
        </div>
        <div>
            {touched &&
                ((error && <span className="text-danger">{error}</span>)
                    || (warning && <span className="text-warning">{warning}</span>))
            }
            &nbsp;
        </div>
    </div>
);

export default FieldInput;

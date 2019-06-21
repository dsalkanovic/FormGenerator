import React from 'react';
import { Field } from 'formik';
import Tooltip from 'rc-tooltip';

import 'rc-tooltip/assets/bootstrap.css';
import './fields.scss';

class InputField extends React.Component {
    render() {
        const { name, type = 'text', placeholder, width = 12, className = '' } = this.props;

        return (
            <Field
                name={name}
                render={({ field, form: { errors, touched } }) => {
                    const label = placeholder || name;
                    const classes = className.indexOf('col-') >= 0 ? className : `col-${width} ${className}`;
                    const displayErrors = !!errors && !!errors[name] && !!touched && !!touched[name];

                    return (
                        <div className={`form-field input-field ${classes}`}>
                            <Tooltip id={name} visible={displayErrors} trigger={'hover'} overlay={errors[name] || ''}>
                                <div className={`${displayErrors ? 'has-errors' : ''}`}>
                                    {!!field.value && <div className="value-label">{label}</div>}
                                    <input
                                        {...field}
                                        autoComplete="off"
                                        className="form-control"
                                        type={type}
                                        name={name}
                                        placeholder={label}
                                    />
                                </div>
                            </Tooltip>
                        </div>
                    );
                }}
            />
        );
    }
}

export default InputField;

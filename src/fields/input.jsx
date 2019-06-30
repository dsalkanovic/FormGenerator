import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FormGroup, InputGroup } from '@blueprintjs/core';
import { uuid } from '../utilities/common';

import './fields.scss';

class InputField extends React.Component {
    defaultValue = '';

    render() {
        const { id = uuid(), name, validate, type = 'text', label, placeholder, info, className, extra } = this.props;

        return (
            <Field
                name={name}
                validate={validate}
                render={({ field }) => {
                    return (
                        <FormGroup
                            helperText={
                                <span className="validation-message">
                                    <ErrorMessage name={name} />
                                </span>
                            }
                            label={label}
                            labelFor={id}
                            labelInfo={info}
                            className={className}
                        >
                            <InputGroup
                                {...field}
                                {...extra}
                                onChange={e => field.onChange(e)}
                                id={id}
                                name={name}
                                type={type}
                                placeholder={placeholder}
                                fill={true}
                                autoComplete={`${uuid()}`}
                            />
                        </FormGroup>
                    );
                }}
            />
        );
    }
}

export default InputField;

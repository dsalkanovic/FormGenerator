import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FormGroup, Checkbox } from '@blueprintjs/core';
import { uuid } from '../utilities/common';

import './fields.scss';

class CheckboxField extends React.Component {
    defaultValue = false;

    render() {
        const { id = uuid(), name, validate, label, placeholder, info, className, extra } = this.props;

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
                            <Checkbox
                                {...field}
                                {...extra}
                                id={id}
                                name={name}
                                checked={!!field.value}
                                label={placeholder}
                                onChange={field.onChange}
                            />
                        </FormGroup>
                    );
                }}
            />
        );
    }
}

export default CheckboxField;

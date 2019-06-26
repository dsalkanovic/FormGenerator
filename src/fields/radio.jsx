import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FormGroup, RadioGroup, Radio } from '@blueprintjs/core';
import { uuid } from '../utilities/common';

import './fields.scss';

class RadioField extends React.Component {
    defaultValue = '';

    render() {
        const { id = uuid(), name, inline = true, validate, options = [], label, className, extra } = this.props;

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
                            className={className}
                        >
                            <RadioGroup
                                {...field}
                                {...extra}
                                id={id}
                                name={name}
                                label={label}
                                onChange={field.onChange}
                                selectedValue={field.value}
                                className={`radio-field`}
                                inline={inline}
                            >
                                {options.map(({ value, label }, index) => (
                                    <Radio
                                        key={index}
                                        label={label}
                                        value={value.toString()}
                                        checked={field.value === value}
                                    />
                                ))}
                            </RadioGroup>
                        </FormGroup>
                    );
                }}
            />
        );
    }
}

export default RadioField;

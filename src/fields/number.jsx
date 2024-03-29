import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FormGroup, NumericInput } from '@blueprintjs/core';
import { uuid } from '../utilities/common';

import './fields.scss';

class NumberField extends React.Component {
    defaultValue = 0;

    onChange = (value, { onChange }) => {
        const { id, name } = this.props;
        onChange({
            persist: () => {},
            target: {
                type: 'change',
                id,
                name,
                value
            }
        });
    };

    render() {
        const { id = uuid(), name, label, placeholder, info, className, extra } = this.props;

        return (
            <Field
                name={name}
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
                            <NumericInput
                                min={Number.MIN_SAFE_INTEGER}
                                max={Number.MAX_SAFE_INTEGER}
                                {...field}
                                {...extra}
                                id={id}
                                name={name}
                                placeholder={placeholder}
                                fill={true}
                                allowNumericCharactersOnly={false}
                                onValueChange={v => this.onChange(v, field)}
                            />
                        </FormGroup>
                    );
                }}
            />
        );
    }
}

export default NumberField;

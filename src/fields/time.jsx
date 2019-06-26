import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FormGroup } from '@blueprintjs/core';
import { TimePicker } from '@blueprintjs/datetime';
import { uuid } from '../utilities/common';

import './fields.scss';

class TimeField extends React.Component {
    defaultValue = '';

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
        const { id = uuid(), name, validate, label, info, className, useAmPm = true, extra } = this.props;

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
                            <TimePicker
                                {...field}
                                {...extra}
                                id={id}
                                name={name}
                                useAmPm={useAmPm}
                                selectAllOnFocus={true}
                                onChange={v => this.onChange(v, field)}
                                fill={true}
                            />
                        </FormGroup>
                    );
                }}
            />
        );
    }
}

export default TimeField;

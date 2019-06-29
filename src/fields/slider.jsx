import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FormGroup, Slider } from '@blueprintjs/core';
import { uuid } from '../utilities/common';

import './fields.scss';

class SliderField extends React.Component {
    defaultValue = 0;

    onChange = async (value, { onChange }, { submitForm }) => {
        const { id, name, submitOnChange = false } = this.props;
        await onChange({
            persist: () => {},
            target: {
                type: 'change',
                id,
                name,
                value
            }
        });

        if (!!submitOnChange) {
            submitForm();
        }
    };

    render() {
        const {
            id = uuid(),
            name,
            label,
            info,
            className,
            extra = { min: 1, max: 100, stepSize: 1, labelStepSize: 100 },
            disabled = false
        } = this.props;

        return (
            <Field
                name={name}
                render={({ field, form }) => {
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
                            <Slider
                                disabled={disabled}
                                {...field}
                                {...extra}
                                onChange={v => this.onChange(v, field, form)}
                                value={field.value}
                                vertical={false}
                            />
                        </FormGroup>
                    );
                }}
            />
        );
    }
}

export default SliderField;

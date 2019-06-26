import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FormGroup, Button, TagInput } from '@blueprintjs/core';
import { uuid } from '../utilities/common';

import './fields.scss';

class TagField extends React.Component {
    defaultValue = [];

    onChange = (value, { onChange }) => {
        const { id, name } = this.props;
        onChange({
            persist: () => {},
            target: {
                type: 'change',
                id,
                name,
                value: value || []
            }
        });
    };

    clearButton = field => {
        const { disabled } = this.props;
        if (field.value.length === 0) return null;

        return <Button disabled={disabled} icon={'cross'} minimal={true} onClick={() => this.onChange([], field)} />;
    };

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
                            <TagInput
                                {...field}
                                {...extra}
                                id={id}
                                name={name}
                                type={type}
                                placeholder={placeholder}
                                fill={true}
                                addOnBlur={true}
                                tagProps={{ minimal: true }}
                                rightElement={this.clearButton(field)}
                                onChange={v => this.onChange(v, field)}
                                values={field.value || []}
                            />
                        </FormGroup>
                    );
                }}
            />
        );
    }
}

export default TagField;

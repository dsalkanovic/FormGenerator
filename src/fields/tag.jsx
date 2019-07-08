import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FormGroup, Button, TagInput } from '@blueprintjs/core';
import { uuid, distinct } from '../utilities/common';

import './fields.scss';

class TagField extends React.Component {
    defaultValue = [];

    onChange = async (value, { onChange }, { submitForm }) => {
        const { id, name, submitOnChange, distinct: onlyUnique = false } = this.props;
        const values = !!onlyUnique ? value.filter(distinct) : value;

        await onChange({
            persist: () => {},
            target: {
                type: 'change',
                id,
                name,
                value: values || []
            }
        });

        if (!!submitOnChange) {
            submitForm();
        }
    };

    clearButton = field => {
        const { disabled } = this.props;
        if (!field.value || field.value.length === 0) return null;

        return <Button disabled={disabled} icon={'cross'} minimal={true} onClick={() => this.onChange([], field)} />;
    };

    render() {
        const { id = uuid(), name, validate, type = 'text', label, placeholder, info, className, extra } = this.props;

        return (
            <Field
                name={name}
                validate={validate}
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
                            <TagInput
                                {...extra}
                                id={id}
                                name={name}
                                type={type}
                                placeholder={placeholder}
                                fill={true}
                                addOnBlur={true}
                                tagProps={{ minimal: true }}
                                rightElement={this.clearButton(field)}
                                onChange={v => this.onChange(v, field, form)}
                                values={field.value || []}
                                inputProps={{ name: `${name}Raw` }}
                            />
                        </FormGroup>
                    );
                }}
            />
        );
    }
}

export default TagField;

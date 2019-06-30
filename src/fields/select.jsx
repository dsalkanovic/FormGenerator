import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FormGroup, MenuItem, Button } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { uuid } from '../utilities/common';

import './fields.scss';

class SelectField extends React.Component {
    defaultValue = '';

    onItemSelect = async ({ value }, { onChange }, { submitForm }) => {
        const { id, name, submitOnChange } = this.props;
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

    renderOption = (option, { handleClick, modifiers }) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }

        return (
            <MenuItem
                className="fg-field-fill"
                active={modifiers.active}
                disabled={modifiers.disabled}
                key={option.value}
                onClick={handleClick}
                text={option.label}
            />
        );
    };

    render() {
        const { id = uuid(), name, validate, label, info, placeholder, className, extra, options } = this.props;

        return (
            <Field
                name={name}
                validate={validate}
                render={({ field, form }) => {
                    const activeOption = options.find(o => o.value === field.value);

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
                            <Select
                                {...field}
                                {...extra}
                                id={id}
                                name={name}
                                items={options}
                                filterable={false}
                                itemRenderer={this.renderOption}
                                className="fg-field-fill"
                                inputProps={{ className: 'fg-field-fill' }}
                                noResults={<MenuItem disabled={true} text="-" />}
                                onItemSelect={v => this.onItemSelect(v, field, form)}
                            >
                                <Button
                                    rightIcon="caret-down"
                                    text={activeOption ? activeOption.label : placeholder}
                                    className="fg-field-fill space-between"
                                />
                            </Select>
                        </FormGroup>
                    );
                }}
            />
        );
    }
}

export default SelectField;

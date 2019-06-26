import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FormGroup, MenuItem, Button } from '@blueprintjs/core';
import { MultiSelect } from '@blueprintjs/select';
import { uuid } from '../utilities/common';

import './fields.scss';

class MultiSelectField extends React.Component {
    defaultValue = '';

    onItemSelect = ({ value }, field) => {
        const { id, name } = this.props;
        const fieldValue = field.value || [];
        const values = fieldValue.includes(value) ? fieldValue.filter(fv => fv !== value) : [...fieldValue, value];

        field.onChange({
            persist: () => {},
            target: {
                type: 'change',
                id,
                name,
                value: values
            }
        });
    };

    onRemove = (_, index, field) => {
        const { id, name } = this.props;
        const values = (field.value || []).filter((__, i) => i !== index);
        field.onChange({
            persist: () => {},
            target: {
                type: 'change',
                id,
                name,
                value: values
            }
        });
    };

    onClear = ({ onChange }) => {
        const { id, name } = this.props;
        onChange({
            persist: () => {},
            target: {
                type: 'change',
                id,
                name,
                value: []
            }
        });
    };

    renderOption = (option, { handleClick, modifiers }, { value = [] }) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }

        return (
            <MenuItem
                icon={value.includes(option.value) ? 'tick' : 'blank'}
                disabled={modifiers.disabled}
                key={option.value}
                onClick={handleClick}
                text={option.label}
                shouldDismissPopover={false}
            />
        );
    };

    renderTag = (value, { tagProps, onRemove, rightElement }) => {
        const { options } = this.props;
        return (options.find(o => o.value === value) || {}).label;
    };
    render() {
        const { id = uuid(), name, validate, label, info, placeholder, className, extra, options } = this.props;

        return (
            <Field
                name={name}
                validate={validate}
                render={({ field }) => {
                    // const selectedOptions = options.filter(o => o.value === field.value);

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
                            <MultiSelect
                                {...field}
                                {...extra}
                                id={id}
                                name={name}
                                items={options}
                                filterable={false}
                                placeholder={placeholder}
                                itemRenderer={(o, c) => this.renderOption(o, c, field)}
                                tagRenderer={this.renderTag}
                                popoverProps={{
                                    className: 'fg-field-fill'
                                }}
                                tagInputProps={{
                                    className: 'fg-field-fill',
                                    tagProps: { minimal: true },
                                    onRemove: (_, index) => this.onRemove(_, index, field),
                                    rightElement:
                                        !!field.value && field.value.length > 0 ? (
                                            <Button icon="cross" minimal={true} onClick={() => this.onClear(field)} />
                                        ) : (
                                            undefined
                                        )
                                }}
                                noResults={<MenuItem disabled={true} text="No results." />}
                                onItemSelect={v => this.onItemSelect(v, field)}
                                selectedItems={field.value || []}
                                usePortal={false}
                                inline={false}
                            />
                        </FormGroup>
                    );
                }}
            />
        );
    }
}

export default MultiSelectField;

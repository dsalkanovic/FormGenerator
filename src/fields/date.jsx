import React from 'react';
import moment from 'moment';
import { Field, ErrorMessage } from 'formik';
import { FormGroup } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import { uuid } from '../utilities/common';

import './fields.scss';

class DateField extends React.Component {
    defaultValue = '';

    onChange = async (value, { onChange }, { submitForm }) => {
        const { id = uuid(), name, submitOnChange } = this.props;
        await onChange({
            persist: () => {},
            target: {
                type: 'change',
                id,
                name,
                value: this.momentFormatter().formatDate(value)
            }
        });

        if (!!submitOnChange) {
            submitForm();
        }
    };

    momentFormatter = () => {
        const { format = 'MM/DD/YYY' } = this.props;
        return {
            formatDate: date => moment(date).format(format),
            parseDate: str => moment(str, format).toDate(),
            placeholder: format
        };
    };

    render() {
        const {
            id = uuid(),
            name,
            validate,
            label,
            info,
            className,
            min = moment()
                .add(-1000, 'years')
                .toDate(),
            max = moment()
                .add(1000, 'years')
                .toDate()
        } = this.props;

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
                            className={`${className} fg-date-field`}
                        >
                            <DateInput
                                minDate={this.momentFormatter().parseDate(min)}
                                maxDate={this.momentFormatter().parseDate(max)}
                                defaultValue={this.momentFormatter().parseDate(field.value)}
                                onChange={v => this.onChange(v, field, form)}
                                {...this.momentFormatter()}
                                timePrecision={undefined}
                                fill={true}
                                inputProps={{
                                    onKeyDown: e => {
                                        e.preventDefault();
                                        return false;
                                    }
                                }}
                            />
                        </FormGroup>
                    );
                }}
            />
        );
    }
}

export default DateField;

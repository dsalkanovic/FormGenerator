import React from 'react';
import moment from 'moment';
import { Field, ErrorMessage } from 'formik';
import { FormGroup } from '@blueprintjs/core';
import { DateRangeInput } from '@blueprintjs/datetime';
import { uuid } from '../utilities/common';

import './fields.scss';

class DateRangeField extends React.Component {
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

    momentFormatter = () => {
        const { format = 'MM/DD/YYYY' } = this.props;
        return {
            formatDate: (date, locale) =>
                moment(date)
                    .locale(locale)
                    .format(format),
            parseDate: (str, locale) =>
                moment(str, format)
                    .locale(locale)
                    .toDate(),
            placeholder: format
        };
    };

    render() {
        const { id = uuid(), name, validate, label, info, className, extra, locale } = this.props;

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
                            <DateRangeInput
                                {...field}
                                {...extra}
                                id={id}
                                name={name}
                                locale={locale || moment.locale()}
                                onChange={v => this.onChange(v, field)}
                                {...this.momentFormatter()}
                                fill={true}
                            />
                        </FormGroup>
                    );
                }}
            />
        );
    }
}

export default DateRangeField;

import React from 'react';
import { Fields } from '../../fields';
import * as Yup from 'yup';
import moment from 'moment';

export class DateFieldDefinition {
    format;
    defaultValue;
    min;
    max;

    constructor({ defaultValue, format = 'MM/DD/YYYY', min, max }) {
        this.format = format;
        this.defaultValue =
            defaultValue !== undefined && defaultValue !== null && defaultValue !== ''
                ? defaultValue
                : moment().format(format);
        this.min =
            min !== undefined && min !== null && min !== ''
                ? min
                : moment()
                      .add(-100, 'years')
                      .format(format);
        this.max =
            max !== undefined && max !== null && max !== ''
                ? max
                : moment()
                      .add(100, 'years')
                      .format(format);
    }

    static getValidationFunction = field => validationFunc(field.definition);
    static getProperties = field => getPropertyFields(field);
}

const validationFunc = ({ isRequired = false }) => (!!isRequired ? Yup.string().required() : undefined);

const getPropertyFields = field => {
    const {
        definition: { format }
    } = field;

    return (
        <React.Fragment>
            <Fields.Date
                name={'definition.defaultValue'}
                label={'Default value'}
                format={format}
                submitOnChange={true}
                placeholder={'Default value'}
                className="fg-field width-100"
            />
            <Fields.Date
                name={'definition.min'}
                label={'Earliest'}
                format={format}
                submitOnChange={true}
                className="fg-field width-100"
            />
            <Fields.Date
                name={'definition.max'}
                label={'Latest'}
                format={format}
                submitOnChange={true}
                className="fg-field width-100"
            />
        </React.Fragment>
    );
};

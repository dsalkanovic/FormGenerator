import React from 'react';
import { Fields } from '../../fields';
import * as Yup from 'yup';

export class SelectFieldDefinition {
    isRequired;
    defaultValue;
    options;

    constructor({ isRequired = false, defaultValue = '', options = [] }) {
        this.isRequired = isRequired;
        this.defaultValue = defaultValue;
        this.options = options;
    }

    static getValidationFunction = field => validationFunc(field.definition);
    static getProperties = field => getPropertyFields(field);
}

const validationFunc = ({ isRequired = false }) => (!!isRequired ? Yup.string().required() : undefined);

const getPropertyFields = field => {
    const { definition: { options = [] } = {} } = field;
    return (
        <React.Fragment>
            <Fields.Select
                name={'definition.defaultValue'}
                placeholder={'Default value'}
                options={!!options && options.length > 0 ? options.map(o => ({ value: o, label: o })) : []}
                className="fg-field width-100"
            />
            <Fields.Checkbox
                name={'definition.isRequired'}
                placeholder={'Is Required ?'}
                className="fg-field width-100"
            />
            <Fields.Tag
                name={'definition.options'}
                label={'Options'}
                placeholder={'Options'}
                distinct={true}
                submitOnChange={true}
                className="fg-field width-100"
            />
        </React.Fragment>
    );
};

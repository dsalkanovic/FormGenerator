import React from 'react';
import { Fields } from '../../fields';
import * as Yup from 'yup';

export class TextFieldDefinition {
    defaultValue;
    validation;
    isRequired;
    mask;

    constructor({ defaultValue = '', validation = undefined, isRequired = false, mask = '' }) {
        this.defaultValue = defaultValue;
        this.validation = validation;
        this.isRequired = isRequired;
        this.mask = mask;
    }

    static getValidationFunction = field => validationFunc(field.definition);
    static getProperties = field => getPropertyFields(field);
}

const validationFunc = ({ validation = undefined, isRequired = false }) => {
    if (!validation && !isRequired) return undefined;
    if (!validation && !!isRequired) return Yup.string().required();

    const validators = {
        email: Yup.string().email(),
        zip: Yup.string().test('len', 'Must be exactly 5 characters', val => val.length === 5),
        ssn: Yup.string().matches(/^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/, {
            message: 'Invalid Social Security Number.',
            excludeEmptyString: true
        })
    };

    const validator = validators[validation];
    return isRequired ? validator.required() : validator;
};

const validationOptions = () => {
    return [{ value: 'email', label: 'Email' }, { value: 'zip', label: 'ZIP' }, { value: 'ssn', label: 'SSN' }];
};

const getPropertyFields = field => {
    return (
        <React.Fragment>
            <Fields.Input
                name={'definition.defaultValue'}
                label={'Default value'}
                placeholder={'Default value'}
                className="fg-field width-100"
            />
            <Fields.Checkbox
                name={'definition.isRequired'}
                placeholder={'Is Required ?'}
                className="fg-field width-100"
            />
            <Fields.Select
                name={'definition.validation'}
                placeholder={'Validation'}
                submitOnChange={true}
                options={validationOptions()}
                className="fg-field width-100"
            />
        </React.Fragment>
    );
};

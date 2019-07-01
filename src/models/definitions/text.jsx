import React from 'react';
import { Fields } from '../../fields';
import * as Yup from 'yup';

export class TextFieldDefinition {
    validation;
    isRequired;
    isMulti;
    mask;

    constructor({ validation = '', isRequired = false, isMulti = false, mask = '' }) {
        this.validation = validation;
        this.isRequired = isRequired;
        this.isMulti = isMulti;
        this.mask = mask;
    }
}

export const validationFunc = type => {
    const validators = {
        email: Yup.string().email(),
        zip: Yup.string().test('len', 'Must be exactly 5 characters', val => val.length === 5),
        ssn: Yup.string().matches(/^[0-9]{3}-?[0-9]{2}-?[0-9]{4}$/, {
            message: 'Invalid SSN.',
            excludeEmptyString: true
        })
    };

    return validators[type];
};

const validationOptions = () => {
    return [{ value: 'email', label: 'Email' }, { value: 'zip', label: 'ZIP' }, { value: 'ssn', label: 'SSN' }];
};

export const getPropertyFields = () => {
    return (
        <React.Fragment>
            <Fields.Checkbox
                name={'definition.isMulti'}
                placeholder={'Is Multi-text ?'}
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

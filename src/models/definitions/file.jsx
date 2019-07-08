import React from 'react';
import { Fields } from '../../fields';
import * as Yup from 'yup';

export class FileFieldDefinition {
    isRequired;
    isMulti;
    buttonLabel;

    constructor({ isRequired = false, isMulti = false, buttonLabel = 'Choose ...' }) {
        this.isRequired = isRequired;
        this.isMulti = isMulti;
        this.buttonLabel = buttonLabel;
    }

    static getValidationFunction = field => validationFunc(field.definition);
    static getProperties = field => getPropertyFields(field);
}

const validationFunc = ({ isRequired = false }) => (!!isRequired ? Yup.string().required() : undefined);

const getPropertyFields = field => {
    return (
        <React.Fragment>
            <Fields.Input
                name={'definition.buttonLabel'}
                label={'Button text'}
                placeholder={'Button text'}
                className="fg-field width-100"
            />
            <Fields.Checkbox
                name={'definition.isMulti'}
                placeholder={'Allow multiple files ?'}
                className="fg-field width-100 mg-b-0"
            />
            <Fields.Checkbox
                name={'definition.isRequired'}
                placeholder={'Is Required ?'}
                className="fg-field width-100"
            />
        </React.Fragment>
    );
};

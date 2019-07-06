import React from 'react';
import { Fields } from '../../fields';

export class BooleanFieldDefinition {
    defaultValue;

    constructor({ defaultValue = false }) {
        this.defaultValue = defaultValue;
    }

    static getProperties = f => getPropertyFields(f);
}

export const getPropertyFields = field => {
    return (
        <React.Fragment>
            <Fields.Checkbox
                name={'definition.defaultValue'}
                placeholder={'Default value'}
                className="fg-field width-100"
            />
        </React.Fragment>
    );
};

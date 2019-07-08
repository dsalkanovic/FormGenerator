import React from 'react';
import { FieldTypes } from '../../../models/definitions/fieldTypes';
import { Fields } from '../../../fields';
import { isEmpty } from '../../../utilities/common';

class FieldRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getFieldName = () => {
        const { page, group, field } = this.props;
        let property = '';
        property = isEmpty(page.property) ? property : `${page.property}`;
        property = isEmpty(group.property) ? property : `${property}.${group.property}`;
        property = isEmpty(field.property) ? property : `${property}.${field.property}`;
        return property;
    };

    getField = () => {
        const { field: { id, title, description, type } = {}, definition = {} } = this.props;

        const fieldProps = {
            id,
            name: this.getFieldName(),
            label: title,
            description,
            info: description,
            placeholder: title,
            className: 'fg-field-fill'
        };

        switch (type) {
            case FieldTypes.Text:
                return <Fields.Input {...fieldProps} />;

            case FieldTypes.Number:
                return <Fields.Number {...fieldProps} />;

            case FieldTypes.File:
                return (
                    <Fields.File
                        {...fieldProps}
                        placeholder={definition.buttonLabel || title}
                        multi={definition.isMulti}
                    />
                );

            case FieldTypes.Boolean:
                return <Fields.Checkbox {...fieldProps} label={description} info={''} placeholder={title} />;

            case FieldTypes.Date:
                return (
                    <Fields.Date {...fieldProps} format={definition.format} min={definition.min} max={definition.max} />
                );

            case FieldTypes.Select:
                return (
                    <Fields.Select
                        {...fieldProps}
                        options={(definition.options || []).map(o => ({ value: o, label: o }))}
                    />
                );

            default:
                return (
                    <div>
                        <span>{title}</span> <span>{JSON.stringify(type)}</span>
                    </div>
                );
        }
    };

    render() {
        const { screen, field: { width: { desktop, mobile } } = { width: { desktop: 100, mobile: 100 } } } = this.props;

        return (
            <div className="fg-field-renderer" style={{ width: `${screen.width > 500 ? desktop : mobile}%` }}>
                {this.getField()}
            </div>
        );
    }
}

export default FieldRenderer;

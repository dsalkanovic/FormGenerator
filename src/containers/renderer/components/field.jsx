import React from 'react';
import { FieldTypes } from '../../../models/definitions/fieldTypes';
import { Fields } from '../../../fields';

class FieldRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getField = () => {
        const { field: { id, title, description, type } = {} } = this.props;

        switch (type) {
            case FieldTypes.Text:
                return (
                    <Fields.Input
                        id={id}
                        name={id}
                        label={title}
                        info={description}
                        placeholder={title}
                        className="fg-field-fill"
                    />
                );

            case FieldTypes.Number:
                return (
                    <Fields.Number
                        id={id}
                        name={id}
                        label={title}
                        info={description}
                        placeholder={title}
                        className="fg-field-fill"
                    />
                );

            case FieldTypes.Boolean:
                return (
                    <Fields.Checkbox
                        id={id}
                        name={id}
                        label={title}
                        placeholder={description}
                        className="fg-field-fill"
                    />
                );

            case FieldTypes.Date:
                return (
                    <Fields.Date
                        id={id}
                        name={id}
                        label={title}
                        info={description}
                        placeholder={title}
                        className="fg-field-fill"
                    />
                );

            case FieldTypes.Select:
                return (
                    <Fields.Select
                        id={id}
                        name={id}
                        label={title}
                        info={description}
                        placeholder={title}
                        options={[]}
                        className="fg-field-fill"
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
        const { field: { width: { desktop } } = { width: { desktop: 100 } } } = this.props;
        return (
            <div className="fg-field-renderer" style={{ width: `${desktop}%` }}>
                {this.getField()}
            </div>
        );
    }
}

export default FieldRenderer;

import React from 'react';
import { Card } from '@blueprintjs/core';
import FieldRenderer from './field';

class GroupRenderer extends React.Component {
    renderFields = () => {
        const { page, group = {} } = this.props;
        const { fields = [], width: { desktop } = { desktop: 100, mobile: 100 } } = group;

        return (
            <div className="fg-group-renderer" style={{ width: `${desktop}%` }}>
                <div className="fg-fields-wrapper pd-t-10">
                    {fields.map((field, i) => (
                        <FieldRenderer key={i} page={page} group={group} field={field} definition={field.definition} />
                    ))}
                </div>
            </div>
        );
    };

    render() {
        const { page, group = {}, screen } = this.props;
        const {
            title,
            description,
            block,
            width: { desktop, mobile } = { desktop: 100, mobile: 100 },
            fields = []
        } = group;

        if (!block) return this.renderFields();

        return (
            <div className="fg-group-renderer" style={{ width: `${screen.width > 500 ? desktop : mobile}%` }}>
                <Card elevation={0} className="">
                    <div className="fg-group-header mg-b-20">
                        <h3 className="mg-0">{title}</h3>
                        {!!description && <span className="bp3-text-small bp3-text-muted">{description}</span>}
                    </div>
                    <div className="fg-fields-wrapper">
                        {fields.map((field, i) => (
                            <FieldRenderer
                                key={i}
                                screen={screen}
                                page={page}
                                group={group}
                                field={field}
                                definition={field.definition}
                            />
                        ))}
                    </div>
                </Card>
            </div>
        );
    }
}

export default GroupRenderer;

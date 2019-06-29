import React from 'react';
import { Card } from '@blueprintjs/core';

class GroupRenderer extends React.Component {
    renderFields = () => {
        const { group: { fields = [], width: { desktop } = { desktop: 100, mobile: 100 } } = {} } = this.props;
        return (
            <div className="fg-group-renderer" style={{ width: `${desktop}%` }}>
                {fields.map((field, i) => (
                    <div key={i}>field {field.id}</div>
                ))}
            </div>
        );
    };

    render() {
        const { group = {} } = this.props;
        const { title, description, block, width: { desktop } = { desktop: 100, mobile: 100 }, fields = [] } = group;

        if (!block) return this.renderFields();

        return (
            <div className="fg-group-renderer" style={{ width: `${desktop}%` }}>
                <Card elevation={0} className="">
                    <div className="fg-group-header mg-b-20">
                        <h3 className="mg-0">{title}</h3>
                        {!!description && <span className="bp3-text-small bp3-text-muted">{description}</span>}
                    </div>
                    {fields.map((field, i) => (
                        <div key={i}>field {field.id}</div>
                    ))}
                </Card>
            </div>
        );
    }
}

export default GroupRenderer;

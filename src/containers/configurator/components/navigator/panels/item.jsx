import React from 'react';
import { Button } from '@blueprintjs/core';

class ListItem extends React.Component {
    render() {
        const {
            item: {
                data: { title, definition: { icon } = {} },
                selected,
                onSelect,
                openPanel
            },
            picked = this.props.itemSelected > 0,
            dragHandleProps
        } = this.props;

        return (
            <div className={`fg-panel-item ${picked ? 'dragged' : ''} ${selected ? 'selected' : ''}`}>
                <Button minimal={true} icon={selected ? 'manually-entered-data' : 'cog'} onClick={onSelect} />
                <div className="item-title ellipsis" {...dragHandleProps}>
                    {title}
                </div>
                {!!openPanel ? (
                    <Button minimal={true} icon="caret-right" onClick={openPanel} />
                ) : (
                    <Button className="fg-type-indicator" disabled={true} icon={icon} />
                )}
            </div>
        );
    }
}

export default ListItem;

import React from 'react';
import DraggableList from 'react-draggable-list';
import { FiledTypes } from '../../../../../models/definitions/fieldTypes';

class NavigatorItem extends React.Component {
    constructor(props) {
        super(props);
        const { item } = props;
        const { type, groups, fields } = item;
        this.state = {
            list: type.name === FiledTypes.Page.name ? groups : fields
        };
        this.container = React.createRef();
    }

    setPages = list => this.setState({ ...this.state, list });

    getDragHeight = () => 43;

    render() {
        const { item, itemSelected, dragHandleProps } = this.props;
        const { type } = item;
        const dragged = itemSelected !== 0;
        const showChildren = [FiledTypes.Page.name, FiledTypes.Group.name].includes(type.name);
        const { list } = this.state;

        if (!showChildren) {
            return (
                <div className={`card item ${dragged}`}>
                    <div className="card-header">
                        <span className="configurator-title dragHandle" {...dragHandleProps}>
                            {item.title}
                        </span>
                    </div>
                </div>
            );
        }

        return (
            <div className={`card item ${dragged}`}>
                <div className="card-header">
                    <span className="configurator-title dragHandle" {...dragHandleProps}>
                        {item.title}
                    </span>
                </div>
                <div className="card-body" ref={this.container}>
                    <DraggableList itemKey="id" template={NavigatorItem} list={list} onMoveEnd={this.setPages} />
                </div>
            </div>
        );
    }
}

export default NavigatorItem;

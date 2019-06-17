import React from 'react';
import DraggableList from 'react-draggable-list';
import { Menu } from 'react-feather';

class NavigatorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // getDragHeight = () => 43;

    render() {
        const { item, itemSelected, dragHandleProps } = this.props;

        return (
            <div className={`navigator-page ${itemSelected !== 0}`}>
                <div className="navigator-header">
                    <div className="navigator-handle" {...dragHandleProps}>
                        <Menu />
                    </div>
                    <div className="navigator-title">{item.title}</div>
                </div>
            </div>
        );
    }
}

export default NavigatorPage;

import React from 'react';
import { ViewDayOutlined } from '@material-ui/icons';

class NavigatorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: true
        };
    }

    setExpanded = expanded => this.setState({ ...this.state, expanded });

    render() {
        const { name, children } = this.props;
        const { expanded } = this.state;

        return (
            <div className="navigator-group">
                <div className="title" onClick={() => this.setExpanded(!expanded)}>
                    <ViewDayOutlined className="navigator-icon" /> {name} ({children.length})
                </div>
                {expanded ? children : null}
            </div>
        );
    }
}

export default NavigatorPage;

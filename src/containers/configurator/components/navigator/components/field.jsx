import React from 'react';
import { TextFieldsOutlined } from '@material-ui/icons';

class NavigatorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { name } = this.props;
        return (
            <div className="navigator-field">
                <div className="title">
                    <TextFieldsOutlined className="navigator-icon" /> {name}
                </div>
            </div>
        );
    }
}

export default NavigatorPage;

import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';

class Properties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="configurator-properties">
                <Card elevation={Elevation.ONE}>
                    <h4 className="configurator-pane-title">properties</h4>
                </Card>
            </div>
        );
    }
}

export default Properties;

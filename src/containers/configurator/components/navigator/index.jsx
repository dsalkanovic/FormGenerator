import React from 'react';
import { Card, Elevation, Button } from '@blueprintjs/core';

class Navigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="configurator-navigator">
                <Card elevation={Elevation.ONE}>
                    <h4 className="configurator-pane-title">navigator</h4>
                    <div className="bp3-elevation-1 mg-b-5">
                        <div className="pd-10">page 1</div>
                        <Button onClick={() => console.log('aaaa')} minimal={true} icon="chevron-right" />
                    </div>
                </Card>
            </div>
        );
    }
}

export default Navigator;

import React from 'react';
import { PanelStack } from '@blueprintjs/core';
import PagesPanel from './panels/pages';

class Navigator extends React.Component {
    render() {
        const { height } = this.props;

        return (
            <div className="configurator-navigator" style={{ maxHeight: `${height - 70}px` }}>
                <div className="panel-wrapper bp3-elevation-1">
                    <PanelStack initialPanel={{ component: PagesPanel }} showPanelHeader={false} />
                </div>
            </div>
        );
    }
}

export default Navigator;

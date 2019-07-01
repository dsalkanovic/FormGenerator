import React from 'react';
import Renderer from './containers/renderer';

class FromRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            location: { state: { pages = [] } = {} }
        } = this.props;

        return (
            <div className="pd-20">
                <Renderer pages={pages} />
            </div>
        );
    }
}

export default FromRenderer;

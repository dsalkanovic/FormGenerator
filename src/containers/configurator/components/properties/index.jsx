import React from 'react';
import SimpleBar from 'simplebar-react';

class Properties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { height } = this.props;

        return (
            <div className="card">
                <div className="card-header">
                    <span className="configurator-title">Preview</span>
                </div>
                <SimpleBar style={{ height }}>
                    <div className="card-body" ref={this.container}>
                        properties go here
                    </div>
                </SimpleBar>
            </div>
        );
    }
}

export default Properties;

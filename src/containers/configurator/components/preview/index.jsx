import React from 'react';
import SimpleBar from 'simplebar-react';

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { pages = [], height } = this.props;

        return (
            <div className="card preview-pane">
                <div className="card-header">
                    <span className="configurator-title">Preview</span>
                </div>
                <SimpleBar style={{ height }}>
                    <div className="card-body" ref={this.container}>
                        {pages.length} pages here
                    </div>
                </SimpleBar>
            </div>
        );
    }
}

export default Preview;

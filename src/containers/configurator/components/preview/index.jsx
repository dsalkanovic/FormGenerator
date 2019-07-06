import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card } from '@blueprintjs/core';
import SimpleBar from 'simplebar-react';
import FromRenderer from '../../../renderer';
import { hash } from 'immutable';

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { height, pages = [], selected: { page } = {} } = this.props;
        const index =
            pages.map((p, i) => (p.id === (!!page ? page.id : p.id) ? i : undefined)).find(i => i !== undefined) || 0;

        return (
            <div className="configurator-preview" style={{ height: `${height - 70}px` }}>
                <Card elevation={1} className="fg-panel-wrapper">
                    <Card elevation={0} className="fg-panel-header">
                        <div className="fg-panel-title">
                            <span className="pd-l-5">Preview</span>
                        </div>
                    </Card>
                    <SimpleBar style={{ height: `${height - 121}px` }}>
                        <div className="pd-20">
                            <FromRenderer key={hash(pages)} pages={pages} activePageOverride={index} />
                        </div>
                    </SimpleBar>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    selected: state.configurator.selected,
    pages: state.configurator.pages
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Preview);

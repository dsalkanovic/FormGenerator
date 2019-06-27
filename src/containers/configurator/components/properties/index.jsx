import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card } from '@blueprintjs/core';
import SimpleBar from 'simplebar-react';

class Properties extends React.Component {
    render() {
        const { height, selected = {} } = this.props;
        const { page, group, field } = selected;

        return (
            <div className="configurator-properties" style={{ height: `${height - 70}px` }}>
                <Card elevation={1}>
                    <Card elevation={0} className="fg-panel-header">
                        <div className="fg-panel-title">
                            <span className="pd-l-5">Properties</span>
                        </div>
                    </Card>
                    <SimpleBar style={{ height: `${height - 121}px` }}>
                        <div className="pd-20">
                            <p>{JSON.stringify(page)}</p>
                            <p>{JSON.stringify(group)}</p>
                            <p>{JSON.stringify(field)}</p>
                        </div>
                    </SimpleBar>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    selected: state.configurator.selected
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Properties);

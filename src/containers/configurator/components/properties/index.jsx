import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card } from '@blueprintjs/core';
import SimpleBar from 'simplebar-react';
import FieldProperties from './forms/field';
import GroupProperties from './forms/group';
import PageProperties from './forms/page';

class Properties extends React.Component {
    renderPropertiesForm = () => {
        const { selected = {} } = this.props;
        const { page, group, field } = selected;
        if (!!field) {
            return <FieldProperties />;
        }
        if (!!group) {
            return <GroupProperties />;
        }
        if (!!page) {
            return <PageProperties />;
        }

        return <div className="pd-20 tx-center">Select item to show properties.</div>;
    };

    render() {
        const { height } = this.props;

        return (
            <div className="configurator-properties" style={{ height: `${height - 70}px` }}>
                <Card elevation={1}>
                    <Card elevation={0} className="fg-panel-header">
                        <div className="fg-panel-title">
                            <span className="pd-l-5">Properties</span>
                        </div>
                    </Card>
                    <SimpleBar style={{ height: `${height - 121}px` }}>
                        <div className="pd-y-20 pd-x-5">{this.renderPropertiesForm()}</div>
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

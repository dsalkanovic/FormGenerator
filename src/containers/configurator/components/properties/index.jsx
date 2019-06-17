import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SimpleBar from 'simplebar-react';
import { selectItem, setPages, setGroups, setFields } from '../../../../state/configurator';

class Properties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getItemProperties = () => {
        const { pages, properties } = this.props;
        const { page, group, field } = properties;

        if (!page) return null;

        let item = pages.find(p => p.id === page.id);
        if (!!group && !!item && !!item.groups) {
            item = item.groups.find(g => g.id === group.id);
        }
        if (!!group && !!field && !!item && !!item.fields) {
            item = item.fields.find(f => f.id === field.id);
        }

        return item;
    };

    render() {
        const { height } = this.props;

        const itemProperties = this.getItemProperties();
        if (!itemProperties) return null;

        return (
            <div className="card properties-pane">
                <div className="card-header">
                    <span className="configurator-title">Properties</span>
                </div>
                <SimpleBar style={{ height }}>
                    <div className="card-body">
                        <div>{itemProperties.title}</div>
                    </div>
                </SimpleBar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pages: state.configurator.pages,
    properties: state.configurator.properties
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            selectItem,
            setPages,
            setGroups,
            setFields
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Properties);

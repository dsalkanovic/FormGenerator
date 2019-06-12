import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toolbar from './components/toolbar';
import Navigator from './components/navigator';
import Preview from './components/preview';

import './configurator.scss';

class FormConfigurator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="configurator">
                <Toolbar />
                <Navigator />
                <Preview />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    status: state.configurator.status
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormConfigurator);

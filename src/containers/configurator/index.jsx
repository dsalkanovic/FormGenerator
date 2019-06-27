import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Navigator from './components/navigator';
import Properties from './components/properties';
import Preview from './components/preview';
import { setDimensions } from '../../state/ui';

import 'simplebar/dist/simplebar.min.css';
import './configurator.scss';

class FormConfigurator extends React.Component {
    constructor(props) {
        super(props);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        const { setDimensions } = this.props;
        var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
        setDimensions(rect);
    };

    render() {
        const { height } = this.props;

        return (
            <div className="configurator-wrapper">
                <Navigator height={height} />
                <Properties height={height} />
                <Preview height={height} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    height: state.ui.screen.height
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            setDimensions
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormConfigurator);

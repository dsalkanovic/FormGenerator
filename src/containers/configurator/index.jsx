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
        const { height, pages } = this.props;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <Navigator pages={pages} height={height} />
                    </div>
                    <div className="col">
                        <Properties pages={pages} height={height} />
                    </div>
                    <div className="col-6">
                        <Preview pages={pages} height={height} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pages: state.configurator.pages,
    height: state.ui.panel.height
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

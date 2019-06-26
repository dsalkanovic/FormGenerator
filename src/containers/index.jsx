import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../state';
import FormConfigurator from './configurator';
import { FocusStyleManager } from '@blueprintjs/core';

class FormGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        FocusStyleManager.onlyShowFocusOnTabs();

        return (
            <Provider store={store}>
                <div className="form-generator">
                    <div className="header">
                        <span>form generator ...</span>
                    </div>
                    <div className="stage">
                        <FormConfigurator />
                    </div>
                </div>
            </Provider>
        );
    }
}

export default FormGenerator;

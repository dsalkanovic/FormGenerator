import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../state';
import FormConfigurator from './configurator';
import {
    FocusStyleManager,
    Navbar,
    NavbarGroup,
    NavbarDivider,
    NavbarHeading,
    Button,
    Classes
} from '@blueprintjs/core';

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
                    <Navbar className="fg-navbar">
                        <NavbarGroup>
                            <NavbarHeading>Form Generator</NavbarHeading>
                            <NavbarDivider />
                            <Button className={Classes.MINIMAL} icon="floppy-disk" text="Save" />
                        </NavbarGroup>
                    </Navbar>
                    <div className="stage">
                        <FormConfigurator />
                    </div>
                </div>
            </Provider>
        );
    }
}

export default FormGenerator;

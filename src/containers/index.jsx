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
    Menu,
    MenuItem,
    Popover,
    Button,
    MenuDivider
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
                            <Popover
                                content={
                                    <Menu>
                                        <MenuItem icon="floppy-disk" text="Save" />
                                        <MenuDivider />
                                        <MenuItem icon="new-object" text="New" />
                                        <MenuDivider />
                                        <MenuItem icon="export" text="Export" />
                                        <MenuItem icon="import" text="Import" />
                                    </Menu>
                                }
                            >
                                <Button minimal={true} text="File" />
                            </Popover>
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

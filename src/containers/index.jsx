import React from 'react';
import { Provider } from 'react-redux';
import FileSaver from 'file-saver';
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
import { uuid } from '../utilities/common';

class FormGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    saveFile = ({ form, pages }) => {
        var blob = new Blob([JSON.stringify({ form, pages })], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(blob, `form-${uuid(8)}.json`);
    };

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
                                        <MenuItem
                                            icon="eye-open"
                                            text="Preview"
                                            onClick={() =>
                                                this.props.history.push(`${process.env.PUBLIC_URL}/form`, {
                                                    pages: store.getState().configurator.pages
                                                })
                                            }
                                        />
                                        <MenuItem icon="floppy-disk" text="Save" disabled={true} />
                                        <MenuDivider />
                                        <MenuItem icon="new-object" text="New" disabled={true} />
                                        <MenuDivider />
                                        <MenuItem
                                            icon="export"
                                            text="Export"
                                            onClick={() => this.saveFile(store.getState().configurator)}
                                        />
                                        <MenuItem icon="import" text="Import" disabled={true} />
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

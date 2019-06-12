import React from 'react';
import ToolbarField from './components/field';

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="configurator-toolbar">
                <span className="toolbar-title">Containers</span>
                <ToolbarField name={'page'} />
                <ToolbarField name={'group'} />
                <span className="toolbar-title">Fields</span>
                <ToolbarField name={'text'} />
                <ToolbarField name={'number'} />
                <ToolbarField name={'options'} />
                <ToolbarField name={'toggle'} />
                <ToolbarField name={'date'} />
                <ToolbarField name={'file'} />
                {/* <span className="toolbar-title">Fields</span>
                <ToolbarField name={'text'} />
                <ToolbarField name={'number'} />
                <ToolbarField name={'options'} />
                <ToolbarField name={'toggle'} />
                <ToolbarField name={'date'} />
                <ToolbarField name={'file'} />
                <span className="toolbar-title">Fields</span>
                <ToolbarField name={'text'} />
                <ToolbarField name={'number'} />
                <ToolbarField name={'options'} />
                <ToolbarField name={'toggle'} />
                <ToolbarField name={'date'} />
                <ToolbarField name={'file'} /> */}
            </div>
        );
    }
}

export default Toolbar;

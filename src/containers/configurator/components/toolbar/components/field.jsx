import React from 'react';

class ToolbarField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { name } = this.props;
        return <div className="toolbar-field">{name}</div>;
    }
}

export default ToolbarField;

import React from 'react';
import { Button } from '@blueprintjs/core';

class PropertiesGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: !!props.open };
    }

    toggle = () => this.setState({ ...this.state, open: !this.state.open });

    render() {
        const { open } = this.state;
        const { title, children } = this.props;
        return (
            <div className="fg-properties-group">
                <div className="fg-properties-group-header mg-x-15">
                    <Button
                        fill={true}
                        text={title}
                        rightIcon={!!open ? 'caret-up' : 'caret-down'}
                        onClick={this.toggle}
                        className="mg-b-20"
                    />
                </div>
                {!!open && <div className="fg-properties-group-body">{children}</div>}
            </div>
        );
    }
}

export default PropertiesGroup;

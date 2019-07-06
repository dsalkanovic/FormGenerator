import React from 'react';
import { Card, Button, Intent } from '@blueprintjs/core';

class FormButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {
            buttons: { cancel, back, save, next },
            isValid
        } = this.props;

        return (
            <Card elevation={0} className="fg-buttons">
                <div className="fg-left-buttons">
                    {!!cancel.show && (
                        <Button type="button" minimal={true}>
                            {cancel.text}
                        </Button>
                    )}
                    {!!back.show && (
                        <Button type="button" minimal={true}>
                            {back.text}
                        </Button>
                    )}
                </div>
                <div className="fg-right-buttons">
                    {!!save.show && (
                        <Button type="button" minimal={true} disabled={!isValid}>
                            {save.text}
                        </Button>
                    )}

                    <Button type="submit" intent={Intent.SUCCESS} disabled={!isValid}>
                        {next.text}
                    </Button>
                </div>
            </Card>
        );
    }
}

export default FormButtons;

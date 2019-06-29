import React from 'react';
import { Card } from '@blueprintjs/core';

class PageRenderer extends React.Component {
    render() {
        const { progress, page } = this.props;
        const {
            title,
            header: { description, image, show, showProgress }
        } = page;

        return (
            <React.Fragment>
                {progress({
                    style: { borderRadius: !!show ? '3px 3px 0 0' : '3px', marginBottom: !!show ? '0px' : '20px' },
                    showProgress
                })}
                {!!show && (
                    <Card
                        elevation={0}
                        className="fg-renderer-header"
                        style={{ borderRadius: !!showProgress ? '0 0 3px 3px' : '3px' }}
                    >
                        {!!image && (
                            <div
                                className="fg-page-header-image"
                                style={{
                                    backgroundImage: `url(${image})`,
                                    borderRadius: !!showProgress ? '0px' : '3px 3px 0 0'
                                }}
                            />
                        )}
                        <h3 className="mg-0">{title}</h3>
                        {!!description && <span className="bp3-text-small bp3-text-muted">{description}</span>}
                    </Card>
                )}
                <div>groups go here ...</div>
            </React.Fragment>
        );
    }
}

export default PageRenderer;

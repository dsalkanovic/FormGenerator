import React from 'react';
import { Card } from '@blueprintjs/core';
import GroupRenderer from './group';

class PageRenderer extends React.Component {
    render() {
        const { progress, page, screen } = this.props;
        const {
            title,
            header: { description, image, show, showProgress },
            groups = []
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
                        <h2 className="mg-0">{title}</h2>
                        {!!description && <span className="bp3-text-small bp3-text-muted">{description}</span>}
                    </Card>
                )}
                <div className="fg-groups-wrapper">
                    {groups.map((group, i) => (
                        <GroupRenderer key={i} screen={screen} page={page} group={group} />
                    ))}
                </div>
            </React.Fragment>
        );
    }
}

export default PageRenderer;

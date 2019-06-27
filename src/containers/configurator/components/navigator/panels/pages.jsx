import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SimpleBar from 'simplebar-react';
import DraggableList from 'react-draggable-list';
import { Card, Menu, Button } from '@blueprintjs/core';
import GroupsPanel from './groups';
import ListItem from './item';
import { setPages, selectItem } from '../../../../../state/configurator';
import { Page } from '../../../../../models/page';

class PagesPanel extends React.Component {
    openGroupsPanel = page => {
        const { openPanel } = this.props;
        openPanel({ component: GroupsPanel, props: { page } });
    };

    render() {
        const { height, pages = [], selected = {}, setPages, selectItem } = this.props;

        return (
            <div className="fg-panel-container">
                <Menu>
                    <Card elevation={0} className="fg-panel-header">
                        <div className="fg-panel-title">
                            <span className="pd-l-5">Pages</span>
                        </div>
                        <Button
                            icon="plus"
                            minimal={true}
                            onClick={() => setPages([...pages, new Page({ title: 'New Page', order: pages.length })])}
                        />
                    </Card>
                    <SimpleBar style={{ height: `${height - 121}px` }}>
                        <div className="draggable-area" ref={el => (this.draggable = el)}>
                            <DraggableList
                                itemKey="id"
                                template={ListItem}
                                padding={0}
                                springConfig={{ stiffness: 750, damping: 50 }}
                                list={pages.map(page => ({
                                    id: page.id,
                                    data: page,
                                    selected: selected && selected.page && selected.page.id === page.id,
                                    onSelect: () => selectItem(page),
                                    openPanel: () => this.openGroupsPanel(page)
                                }))}
                                onMoveEnd={newList => setPages(newList.map((p, i) => ({ ...p.data, order: i })))}
                                container={() => this.draggable}
                            />
                        </div>
                    </SimpleBar>
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pages: state.configurator.pages,
    selected: state.configurator.selected,
    height: state.ui.screen.height
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            setPages,
            selectItem
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PagesPanel);

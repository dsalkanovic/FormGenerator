import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DraggableList from 'react-draggable-list';
import SimpleBar from 'simplebar-react';
import { Button, Card, Menu, Classes } from '@blueprintjs/core';
import FieldsPanel from './fields';
import ListItem from './item';
import { setGroups, selectItem } from '../../../../../state/configurator';
import { Group } from '../../../../../models/group';

class GroupsPanel extends React.Component {
    componentDidMount() {
        const { page, groups = [], selected: { group } = {}, selectItem } = this.props;
        if (!group && groups.length > 0) selectItem(page, groups[0]);
    }

    addGroup = async () => {
        const { page, groups = [], setGroups, selectItem } = this.props;
        const newGroup = new Group({ title: 'New Group', order: groups.length });
        await setGroups(page, [...groups, newGroup]);
        selectItem(page, newGroup);
    };

    openFieldsPanel = group => {
        const { page, openPanel } = this.props;
        openPanel({ component: FieldsPanel, props: { page, group } });
    };

    renderBreadcrumb = ({ text, onClick }) => (
        <div className={`ellipsis ${Classes.BREADCRUMB} ${Classes.BREADCRUMB_CURRENT}`} onClick={onClick}>
            {text}
        </div>
    );

    render() {
        const { page, groups = [], closePanel, height, selected, setGroups, selectItem } = this.props;
        return (
            <div className="fg-panel-container">
                <Menu>
                    <Card elevation={0} className="fg-panel-header">
                        <div className="ellipsis">
                            <Button
                                icon="chevron-left"
                                minimal={true}
                                onClick={() => {
                                    closePanel();
                                    selectItem(page);
                                }}
                            />
                            <div className="fg-panel-title">{page.title}</div>
                        </div>
                        <Button icon="plus" minimal={true} onClick={this.addGroup} />
                    </Card>
                    <SimpleBar style={{ height: `${height - 121}px` }}>
                        <div className="draggable-area" ref={el => (this.draggable = el)}>
                            <DraggableList
                                itemKey="id"
                                template={ListItem}
                                padding={0}
                                springConfig={{ stiffness: 750, damping: 50 }}
                                list={groups.map(group => ({
                                    id: group.id,
                                    data: group,
                                    selected: selected && selected.group && selected.group.id === group.id,
                                    onSelect: () => selectItem(page, group),
                                    openPanel: () => this.openFieldsPanel(group)
                                }))}
                                onMoveEnd={newList => setGroups(page, newList.map((g, i) => ({ ...g.data, order: i })))}
                                container={() => this.draggable}
                            />
                        </div>
                    </SimpleBar>
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const page = (state.configurator.pages || []).find(p => p.id === props.page.id);
    const groups = (page || {}).groups;
    return {
        page,
        groups,
        selected: state.configurator.selected,
        height: state.ui.screen.height
    };
};
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            setGroups,
            selectItem
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupsPanel);

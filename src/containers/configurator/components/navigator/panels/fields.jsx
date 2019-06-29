import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DraggableList from 'react-draggable-list';
import SimpleBar from 'simplebar-react';
import { Button, Card, Menu, Classes } from '@blueprintjs/core';
import ListItem from './item';
import { selectItem, setFields } from '../../../../../state/configurator';
import { Field } from '../../../../../models/field';

class FieldsPanel extends React.Component {
    componentDidMount() {
        const { page, group, fields = [], selected: { field } = {}, selectItem } = this.props;
        if (!field && fields.length > 0) selectItem(page, group, fields[0]);
    }

    renderBreadcrumb = ({ text, onClick }) => (
        <div className={`ellipsis ${Classes.BREADCRUMB} ${Classes.BREADCRUMB_CURRENT}`} onClick={onClick}>
            {text}
        </div>
    );

    render() {
        const { page, group, fields = [], closePanel, height, selected, selectItem, setFields } = this.props;
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
                                    selectItem(page, group);
                                }}
                            />
                            <div className="fg-panel-title">{group.title}</div>
                        </div>
                        <Button
                            icon="plus"
                            minimal={true}
                            onClick={() => setFields(page, group, [...fields, new Field({ title: 'New Field' })])}
                        />
                    </Card>
                    <SimpleBar style={{ height: `${height - 121}px` }}>
                        <div className="draggable-area" ref={el => (this.draggable = el)}>
                            <DraggableList
                                itemKey="id"
                                template={ListItem}
                                padding={0}
                                springConfig={{ stiffness: 750, damping: 50 }}
                                list={fields.map(field => ({
                                    id: field.id,
                                    data: field,
                                    selected: selected && selected.field && selected.field.id === field.id,
                                    onSelect: () => selectItem(page, group, field)
                                }))}
                                onMoveEnd={newList =>
                                    setFields(page, group, newList.map((f, i) => ({ ...f.data, order: i })))
                                }
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
    const group = ((page || {}).groups || []).find(g => g.id === props.group.id);
    const fields = (group || {}).fields;
    return {
        page,
        group,
        fields,
        selected: state.configurator.selected,
        height: state.ui.screen.height
    };
};
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            selectItem,
            setFields
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FieldsPanel);

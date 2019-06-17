import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectItem, showProperties, setPages, setGroups, setFields } from '../../../../state/configurator';
import { List, arrayMove } from 'react-movable';
import { Settings, ChevronsRight, ChevronsLeft, Plus } from 'react-feather';
import { arePropertiesShown } from '../common/utilities';

class Navigator extends React.Component {
    renderList = () => {
        const { height, pages, selected, properties, selectItem, showProperties, setPages, setGroups, setFields } = this.props;
        const { page, group } = selected;

        let items = pages;
        let action = ({ oldIndex, newIndex }) => setPages(arrayMove(items, oldIndex, newIndex));
        let propertiesAction = item => showProperties(item);

        if (!!page) {
            items = pages.find(p => p.id === page.id).groups;
            action = ({ oldIndex, newIndex }) => setGroups(page, arrayMove(items, oldIndex, newIndex));
            propertiesAction = item => showProperties(page, item);
        }
        if (!!group) {
            items = pages.find(p => p.id === page.id).groups.find(g => g.id === group.id).fields;
            action = ({ oldIndex, newIndex }) => setFields(page, group, arrayMove(items, oldIndex, newIndex));
            propertiesAction = item => showProperties(page, group, item);
        }

        return (
            <List
                values={items}
                onChange={action}
                renderList={({ children, props, isDragged }) => (
                    <ul {...props} className={`navigator-list ${isDragged ? 'dragged' : ''}`} style={{ height: height }}>
                        {children}
                    </ul>
                )}
                renderItem={({ value, props, isDragged }) => {
                    return (
                        <li
                            {...props}
                            key={value.id}
                            className={`list-item ${isDragged ? 'dragged' : ''} ${arePropertiesShown(value, properties) ? 'selected' : ''}`}
                        >
                            <div className="row">
                                <div className="col item-title ellipsis">{value.title}</div>
                                {!isDragged && (
                                    <div className="col-6 text-right">
                                        <button className="item-action" onClick={() => propertiesAction(value)}>
                                            <Settings />
                                        </button>
                                        {(!page || !group) && (
                                            <button className="item-action open" onClick={() => selectItem(value)}>
                                                <ChevronsRight />
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </li>
                    );
                }}
            />
        );
    };

    render() {
        const {
            selected: { page, group },
            selectItem
        } = this.props;

        return (
            <div className="card navigator-pane">
                <div className="row configurator-header">
                    {(!!page || !!group) && (
                        <div className="col pd-x-0 text-center navigator-back" onClick={() => selectItem(!!page && !!group ? page : undefined)}>
                            <ChevronsLeft />
                        </div>
                    )}
                    <div className="col pd-x-0 configurator-title ellipsis">{!!page ? (!!group ? group.title : page.title) : 'Pages'}</div>
                    <div className="col pd-x-0 text-center navigator-actions">
                        <Plus />
                    </div>
                </div>
                <div className="card-body navigator-body">{this.renderList()}</div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pages: state.configurator.pages,
    selected: state.configurator.selected,
    properties: state.configurator.properties
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            selectItem,
            showProperties,
            setPages,
            setGroups,
            setFields
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigator);

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectItem, setPages, setGroups, setFields } from '../../../../state/configurator';
import { List, arrayMove } from 'react-movable';
import { Settings, XSquare, ChevronsRight, ChevronsLeft } from 'react-feather';

class Navigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderList = () => {
        const { height, pages, selected, selectItem, setPages, setGroups, setFields } = this.props;
        const { page, group } = selected;

        let items = pages;
        let action = ({ oldIndex, newIndex }) => setPages(arrayMove(items, oldIndex, newIndex));

        if (!!page) {
            items = pages.find(p => p.id === page.id).groups;
            action = ({ oldIndex, newIndex }) => setGroups(page, arrayMove(items, oldIndex, newIndex));
        }
        if (!!group) {
            items = pages.find(p => p.id === page.id).groups.find(g => g.id === group.id).fields;
            action = ({ oldIndex, newIndex }) => setFields(page, group, arrayMove(items, oldIndex, newIndex));
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
                renderItem={({ value, props, isDragged, isSelected }) => {
                    return (
                        <li {...props} key={value.id} className={`list-item ${isDragged ? 'dragged' : ''} ${isSelected ? 'selected' : ''}`}>
                            <div className="row">
                                <div className="col item-title">{value.title}</div>
                                {!isDragged && (
                                    <div className="col-6 text-right">
                                        <button className="item-action" onClick={e => console.log(value)}>
                                            <XSquare />
                                        </button>
                                        <button className="item-action" onClick={e => console.log(value)}>
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

        let title = (
            <div className="card-header">
                <span className="configurator-title">Pages</span>
            </div>
        );
        if (!!page) {
            title = (
                <div className="card-header">
                    <span className="navigator-back" onClick={() => selectItem()}>
                        <ChevronsLeft />
                    </span>
                    <span className="configurator-title">Groups</span>
                </div>
            );
        }
        if (group) {
            title = (
                <div className="card-header">
                    <span className="navigator-back" onClick={() => selectItem(page)}>
                        <ChevronsLeft />
                    </span>
                    <span className="configurator-title">Fields</span>
                </div>
            );
        }

        return (
            <div className="card">
                {title}
                <div className="card-body navigator-body">{this.renderList()}</div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pages: state.configurator.pages,
    selected: state.configurator.selected
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            selectItem,
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

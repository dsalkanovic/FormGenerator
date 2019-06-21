import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import SimpleBar from 'simplebar-react';
import { selectItem, setPages, setGroups, setFields, removeItem } from '../../../../state/configurator';
import { X } from 'react-feather';
import { Formik, Form, Field } from 'formik';
import { FiledTypes } from '../../../../models/definitions/fieldTypes';

class Properties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getItemProperties = () => {
        const { pages, properties } = this.props;
        const { page, group, field } = properties;

        if (!page) return null;

        let item = pages.find(p => p.id === page.id);
        if (!!group && !!item && !!item.groups) {
            item = item.groups.find(g => g.id === group.id);
        }
        if (!!group && !!field && !!item && !!item.fields) {
            item = item.fields.find(f => f.id === field.id);
        }

        return item;
    };

    render() {
        const { height, removeItem } = this.props;

        const itemProperties = this.getItemProperties();
        if (!itemProperties) return null;

        console.log('item type', itemProperties.type);
        new Map(FiledTypes).map((t, k) => console.log(t, k));

        return (
            <div className="card properties-pane">
                <div className="card-header">
                    <span className="configurator-title">Properties</span>
                </div>
                <SimpleBar style={{ height }}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <Formik
                                    key={itemProperties.id}
                                    enableReinitialize={true}
                                    initialValues={{ ...itemProperties }}
                                    onSubmit={v => console.log(v)}
                                    render={({ handleChange, submitForm }) => {
                                        return (
                                            <Form
                                                noValidate
                                                onChange={async e => {
                                                    await handleChange(e);
                                                    submitForm();
                                                }}
                                            >
                                                <React.Fragment>
                                                    <div className="form-group">
                                                        <Field type="text" name="title" className="form-control" />
                                                    </div>
                                                </React.Fragment>
                                            </Form>
                                        );
                                    }}
                                />
                            </div>
                            <div className="col-12">
                                <button type="button" className="btn btn-block button-grey" onClick={removeItem}>
                                    <X />
                                    <span>Remove</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </SimpleBar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pages: state.configurator.pages,
    properties: state.configurator.properties
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            selectItem,
            setPages,
            setGroups,
            setFields,
            removeItem
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Properties);

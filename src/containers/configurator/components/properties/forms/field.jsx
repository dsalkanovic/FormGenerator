import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '@blueprintjs/core';
import { Fields } from '../../../../../fields';
import { setFields, selectItem } from '../../../../../state/configurator';
import { getFieldProperties } from '../../../../../models/definitions/fieldTypes';

class FieldProperties extends React.Component {
    onSubmit = values => {
        const { setFields, page, group, fields = [] } = this.props;
        setFields(page, group, [...fields.map(f => (f.id === values.id ? { ...f, ...values } : f))]);
    };

    onRemove = async () => {
        const { selectItem, setFields, page, group, fields, field } = this.props;
        await selectItem();
        setFields(page, group, [...fields.filter(f => f.id !== field.id)]);
    };

    render() {
        const { page, group, field } = this.props;

        return (
            <React.Fragment>
                <Formik
                    key={field.id}
                    enableReinitialize={true}
                    initialValues={{ ...field }}
                    validationSchema={Yup.object().shape({})}
                    onSubmit={this.onSubmit}
                    render={({ handleChange, submitForm, values }) => {
                        return (
                            <Form
                                onChange={async e => {
                                    await handleChange(e);
                                    submitForm();
                                }}
                            >
                                <Fields.Input
                                    name={'title'}
                                    label={'Title'}
                                    placeholder={'Title'}
                                    className="fg-field width-100"
                                />
                                <Fields.Input
                                    name={'description'}
                                    label={'Description'}
                                    placeholder={'Description'}
                                    className="fg-field width-100"
                                />

                                {getFieldProperties(field)}

                                <Fields.Slider
                                    label={'Width'}
                                    info={'(desktop)'}
                                    name={'width.desktop'}
                                    submitOnChange={true}
                                    extra={{
                                        min: 25,
                                        max: 100,
                                        stepSize: 5,
                                        labelStepSize: 25
                                    }}
                                    className="fg-field width-100 mg-b-0"
                                />
                                <Fields.Slider
                                    label={'Width'}
                                    info={'(mobile)'}
                                    name={'width.mobile'}
                                    submitOnChange={true}
                                    extra={{
                                        min: 25,
                                        max: 100,
                                        stepSize: 5,
                                        labelStepSize: 25
                                    }}
                                    className="fg-field width-100"
                                />
                                <Fields.Input
                                    name={'property'}
                                    label={'Property'}
                                    info={`(${page.property}.${group.property}.${values.property})`}
                                    placeholder={'Property'}
                                    className="fg-field width-100"
                                />

                                <div className="pd-15">
                                    <Button
                                        type="button"
                                        intent="danger"
                                        icon="trash"
                                        text="Remove"
                                        fill={true}
                                        onClick={this.onRemove}
                                    />
                                </div>
                            </Form>
                        );
                    }}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    const selected = state.configurator.selected;

    const pages = state.configurator.pages;
    const page = (pages || []).find(p => p.id === selected.page.id);

    const groups = (page || {}).groups;
    const group = (groups || []).find(g => g.id === selected.group.id);

    const fields = (group || {}).fields;
    const field = (fields || []).find(f => f.id === selected.field.id);

    return {
        selected,
        pages,
        page,
        groups,
        group,
        fields,
        field
    };
};
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            setFields,
            selectItem
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FieldProperties);

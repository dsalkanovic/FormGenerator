import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '@blueprintjs/core';
import { Fields } from '../../../../../fields';
import { setPages, selectItem } from '../../../../../state/configurator';
import PropertiesGroup from '../components/propertiesGroup';
import { safeVariablePattern } from '../../../../../utilities/constants';

class PageProperties extends React.Component {
    onSubmit = values => {
        const { setPages, pages = [] } = this.props;
        setPages([...pages.map(p => (p.id === values.id ? { ...p, ...values } : p))]);
    };

    onRemove = async () => {
        const { selectItem, setPages, pages, page } = this.props;
        await selectItem();
        setPages([...pages.filter(p => p.id !== page.id)]);
    };

    render() {
        const { page } = this.props;

        return (
            <Formik
                enableReinitialize={true}
                initialValues={{ ...page }}
                validationSchema={Yup.object().shape({
                    property: Yup.string()
                        .matches(safeVariablePattern, { message: 'Invalid property name.' })
                        .required()
                })}
                onSubmit={this.onSubmit}
                render={({ handleChange, submitForm }) => {
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
                            <PropertiesGroup title="Header">
                                <Fields.Input
                                    name={'header.description'}
                                    label={'Description'}
                                    placeholder={'Description'}
                                    className="fg-field width-100"
                                />
                                <Fields.Input
                                    name={'header.image'}
                                    label={'Header Image'}
                                    placeholder={'Url'}
                                    className="fg-field width-100"
                                />
                                <Fields.Checkbox
                                    name={'header.show'}
                                    placeholder={'Show header ?'}
                                    className="fg-field width-100 mg-b-0"
                                />
                                <Fields.Checkbox
                                    name={'header.showProgress'}
                                    placeholder={'Show progress bar ?'}
                                    className="fg-field width-100"
                                />
                            </PropertiesGroup>

                            <PropertiesGroup title="Buttons">
                                <Fields.Input
                                    name={'buttons.cancel.text'}
                                    label={'Cancel label'}
                                    placeholder={'Cancel label'}
                                    className="fg-field width-100 mg-b-0"
                                />
                                <Fields.Checkbox
                                    name={'buttons.cancel.show'}
                                    placeholder={'Show cancel button ?'}
                                    className="fg-field width-100"
                                />

                                <Fields.Input
                                    name={'buttons.back.text'}
                                    label={'Back label'}
                                    placeholder={'Back label'}
                                    className="fg-field width-100 mg-b-0"
                                />
                                <Fields.Checkbox
                                    name={'buttons.back.show'}
                                    placeholder={'Show back button ?'}
                                    className="fg-field width-100"
                                />
                                <Fields.Input
                                    name={'buttons.save.text'}
                                    label={'Save label'}
                                    placeholder={'Save label'}
                                    className="fg-field width-100 mg-b-0"
                                />
                                <Fields.Checkbox
                                    name={'buttons.save.show'}
                                    placeholder={'Show save button ?'}
                                    className="fg-field width-100"
                                />
                                <Fields.Input
                                    name={'buttons.next.text'}
                                    label={'Next label'}
                                    placeholder={'Next label'}
                                    className="fg-field width-100"
                                />
                            </PropertiesGroup>

                            <Fields.Input
                                name={'property'}
                                label={'Property'}
                                placeholder={'Property'}
                                className="fg-field width-100"
                            />

                            <div className="mg-x-15 mg-t-20">
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
        );
    }
}

const mapStateToProps = state => {
    const selected = state.configurator.selected;
    const pages = state.configurator.pages;
    const page = (pages || []).find(p => p.id === selected.page.id);

    return {
        selected,
        pages,
        page
    };
};
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
)(PageProperties);

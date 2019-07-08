import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '@blueprintjs/core';
import { Fields } from '../../../../../fields';
import { setGroups, selectItem } from '../../../../../state/configurator';
import { safeVariablePattern } from '../../../../../utilities/constants';

class GroupProperties extends React.Component {
    onSubmit = values => {
        const { setGroups, page, groups = [] } = this.props;
        setGroups(page, [...groups.map(g => (g.id === values.id ? { ...g, ...values } : g))]);
    };

    onRemove = async () => {
        const { selectItem, setGroups, page, groups, group } = this.props;
        await selectItem();
        setGroups(page, [...groups.filter(g => g.id !== group.id)]);
    };

    render() {
        const { page, group } = this.props;

        return (
            <Formik
                enableReinitialize={true}
                initialValues={{ ...group }}
                validationSchema={Yup.object().shape({
                    property: Yup.string()
                        .matches(safeVariablePattern, { message: 'Invalid property name.' })
                        .required()
                })}
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
                            <Fields.Checkbox
                                name={'block'}
                                placeholder={'Block (show as block?)'}
                                className="fg-field width-100"
                            />
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
                                info={`(${page.property}.${values.property})`}
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
        );
    }
}

const mapStateToProps = state => {
    const selected = state.configurator.selected;

    const pages = state.configurator.pages;
    const page = (pages || []).find(p => p.id === selected.page.id);

    const groups = (page || {}).groups;
    const group = (groups || []).find(g => g.id === selected.group.id);

    return {
        selected,
        pages,
        page,
        groups,
        group
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
)(GroupProperties);

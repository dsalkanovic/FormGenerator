import React from 'react';
import _ from 'lodash';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Card, Button, ProgressBar, Popover, Menu, MenuItem } from '@blueprintjs/core';
import FormButtons from './components/buttons';
import PageRenderer from './components/page';
import { getValidationFunction } from '../../models/definitions/fieldTypes';

import './renderer.scss';

class FromRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pageIndex: 0, screen: undefined };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ ...this.state, screen: { width: window.innerWidth, height: window.innerHeight } });
    };

    onSubmit = values => {
        console.log(values);
    };

    getInitialValues = page => {
        const initialValues = {};
        if (!page) return initialValues;

        const { groups = [] } = page;
        if (!groups || groups.length === 0) return initialValues;

        groups
            .map(g => g.fields.map(f => ({ ...f, groupProperty: g.property })))
            .flat()
            .forEach(field => {
                const { property, groupProperty, definition } = field;
                initialValues[page.property] = !!initialValues[page.property] ? initialValues[page.property] : {};
                initialValues[page.property][groupProperty] = !!initialValues[page.property][groupProperty]
                    ? initialValues[page.property][groupProperty]
                    : {};
                initialValues[page.property][groupProperty][property] = definition.defaultValue;
            });

        return initialValues;
    };

    getValidationSchema = page => {
        if (!page) return Yup.object().shape({});
        if (!page.groups || page.groups.length === 0) return Yup.object().shape({});

        const groups = page.groups
            .map(g => ({
                property: g.property,
                fields: g.fields.filter(f => !!f.definition && (!!f.definition.isRequired || !!f.definition.validation))
            }))
            .filter(g => g.fields && g.fields.length > 0);

        const pageShape = {};
        groups.forEach(({ property, fields }) => {
            const group = {};
            fields.forEach(field => (group[field.property] = getValidationFunction(field)));
            pageShape[property] = Yup.object().shape(group);
        });

        if (_.isEmpty(pageShape)) {
            return undefined;
        }

        const formShape = {};
        formShape[page.property] = Yup.object().shape(pageShape);
        return Yup.object().shape(formShape);
    };

    render() {
        const { pageIndex, screen } = this.state;
        const { pages = [], activePageOverride } = this.props;
        if (!screen || pages.length === 0) return null;

        const index = Number.isNaN(Number.parseInt(activePageOverride)) ? pageIndex : activePageOverride;
        const page = pages[index];
        const initialValues = this.getInitialValues(page);
        const validationSchema = this.getValidationSchema(page);

        return (
            <div className="form-renderer">
                <Formik
                    key={page.id}
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={this.onSubmit}
                    render={({ isValid }) => {
                        return (
                            <Form>
                                <PageRenderer
                                    screen={screen}
                                    page={page}
                                    progress={({ style, showProgress }) =>
                                        !!showProgress && (
                                            <Card elevation={0} className="fg-renderer-navigation" style={style}>
                                                <ProgressBar
                                                    value={(index + 1) / (pages.length || 1)}
                                                    className="bp3-intent-success fg-renderer-progress"
                                                    animate={false}
                                                />
                                                <Popover
                                                    position="left-top"
                                                    content={
                                                        <Menu>
                                                            {pages.map((p, i) => (
                                                                <MenuItem
                                                                    key={i}
                                                                    icon={i === index ? 'confirm' : 'circle'}
                                                                    disabled={i === index}
                                                                    text={p.title}
                                                                />
                                                            ))}
                                                        </Menu>
                                                    }
                                                >
                                                    <Button icon="menu" minimal={true} className="fg-renderer-menu" />
                                                </Popover>
                                            </Card>
                                        )
                                    }
                                />
                                <FormButtons buttons={page.buttons} />
                            </Form>
                        );
                    }}
                />
            </div>
        );
    }
}

export default FromRenderer;

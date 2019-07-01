import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Card, Button, ProgressBar, Popover, Menu, MenuItem } from '@blueprintjs/core';
import FormButtons from './components/buttons';
import PageRenderer from './components/page';

import './renderer.scss';
import { validationFunc } from '../../models/definitions/text';

class FromRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pageIndex: 0 };
    }

    onSubmit = values => {
        console.log(values);
    };

    getValidationSchema = page => {
        const shape = {};
        if (!page) return Yup.object().shape(shape);

        const { groups = [] } = page;
        if (!groups || groups.length === 0) return Yup.object().shape(shape);
        const rrr = groups
            .map(g => g.fields)
            .flat()
            .filter(f => !!f.definition && !!f.definition.validation);

        rrr.forEach(field => {
            const { property, definition } = field;
            const { validation } = definition;
            shape[`${page.property}.${'group.property'}.${property}`] = validationFunc(validation);
        });

        debugger;

        return Yup.object().shape(shape);
    };

    render() {
        const { pageIndex } = this.state;
        const { pages = [], activePageOverride } = this.props;
        if (pages.length === 0) return null;

        const index = Number.isNaN(Number.parseInt(activePageOverride)) ? pageIndex : activePageOverride;
        const validationSchema = this.getValidationSchema(pages[index]);

        return (
            <Formik
                enableReinitialize={true}
                initialValues={{}}
                validationSchema={validationSchema}
                onSubmit={this.onSubmit}
                render={() => {
                    return (
                        <Form>
                            <PageRenderer
                                page={pages[index]}
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
                            <FormButtons buttons={pages[index].buttons} />
                        </Form>
                    );
                }}
            />
        );
    }
}

export default FromRenderer;

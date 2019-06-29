import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Card, Button, ProgressBar, Popover, Menu, MenuItem } from '@blueprintjs/core';
import FormButtons from './components/buttons';
import PageRenderer from './components/page';

import './renderer.scss';

class FromRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pageIndex: 0 };
    }

    onSubmit = values => {
        console.log(values);
    };

    render() {
        const { pageIndex } = this.state;
        const { pages = [], activePageOverride } = this.props;
        if (pages.length === 0) return null;

        const index = Number.isNaN(activePageOverride) ? pageIndex : activePageOverride;

        return (
            <Formik
                enableReinitialize={true}
                initialValues={{}}
                validationSchema={Yup.object().shape({})}
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

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FromRenderer);

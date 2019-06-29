import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Fields } from './fields';

class FieldsTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const options = [
            { value: 1, label: 'Number 1' },
            { value: 2, label: 'Number 2' },
            { value: 3, label: 'Number 3' },
            { value: 4, label: 'Number 4' },
            { value: 5, label: 'Number 5' }
        ];

        return (
            <Formik
                autoComplete="off"
                onSubmit={values => console.log(values)}
                initialValues={{ name: '', number: '' }}
                validationSchema={Yup.object().shape({
                    xyz: Yup.mixed().required('Required.')
                })}
                render={({ values, errors }) => (
                    <Form noValidate>
                        <div className="fg-field-wrapper">
                            <Fields.Input
                                name={'text'}
                                label={'text'}
                                placeholder={'placeholder'}
                                className="fg-field width-40"
                            />
                            <Fields.Tag
                                name={'tag'}
                                label={'tag'}
                                placeholder={'placeholder'}
                                className="fg-field width-60"
                            />
                            <Fields.Checkbox
                                name={'is_true'}
                                label={'Is true'}
                                placeholder={'is true'}
                                className="fg-field width-50"
                            />

                            <Fields.Radio
                                name={'radio'}
                                label={'radio'}
                                options={[
                                    { value: 1, label: 'one' },
                                    { value: 2, label: 'two' },
                                    { value: 3, label: 'three' }
                                ]}
                                className="fg-field width-50"
                            />
                            <Fields.Switch
                                name={'switch'}
                                label={'Is on'}
                                placeholder={'is on'}
                                className="fg-field width-20"
                            />
                            <Fields.Number
                                name={'number'}
                                label={'number'}
                                placeholder={'placeholder'}
                                className="fg-field width-30"
                            />
                            <Fields.Time name={'time'} label={'time'} className="fg-field width-25" />
                            <Fields.Date name={'date'} label={'date'} className="fg-field width-25" />
                            <Fields.DateRange name={'date_range'} label={'date range'} className="fg-field width-100" />
                            <Fields.Select
                                name={'select'}
                                label={'select'}
                                info={
                                    "(Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.)"
                                }
                                options={[
                                    { value: 1, label: 'one' },
                                    { value: 2, label: 'two' },
                                    { value: 3, label: 'three' }
                                ]}
                                placeholder={'select one option'}
                                className="fg-field width-50"
                            />
                            <Fields.MultiSelect
                                name={'multi_select'}
                                label={'multi select'}
                                info={'(select some options, multiple if applicable)'}
                                options={[
                                    { value: 1, label: 'one' },
                                    { value: 2, label: 'two' },
                                    { value: 3, label: 'three' }
                                ]}
                                placeholder={'select options'}
                                className="fg-field width-50"
                            />
                            <Fields.File
                                name={'file'}
                                label={'file'}
                                multi={true}
                                placeholder={'put some files'}
                                className="fg-field width-100"
                            />
                        </div>
                        <p style={{ wordBreak: 'break-all' }}>{JSON.stringify(values)}</p>
                        <p style={{ wordBreak: 'break-all' }}>{JSON.stringify(errors)}</p>
                        <button type="submit">submit</button>
                    </Form>
                )}
            />
        );
    }
}

export default FieldsTest;

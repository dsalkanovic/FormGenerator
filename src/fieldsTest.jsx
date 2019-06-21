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
                render={({ values }) => (
                    <Form noValidate>
                        <div className="row">
                            <Fields.Input name="name" width={10} />
                            <Fields.Number name="number" width={10} />
                            <Fields.Checkbox name="checkbox" />
                            <Fields.Select name="select" options={options} />
                            <Fields.Date name="date" />
                            <Fields.File name="file" />
                            <button type="submit">submit</button>
                            <div className="col-12 pd-30">{JSON.stringify(values)}</div>
                        </div>
                    </Form>
                )}
            />
        );
    }
}

export default FieldsTest;

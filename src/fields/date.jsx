import React from 'react';
import { Field } from 'formik';

class DateField extends React.Component {
    render() {
        const { name, placeholder } = this.props;
        return <Field name={name} type={'date'} placeholder={name || placeholder} />;
    }
}

export default DateField;

import React from 'react';
import { Field } from 'formik';

class CheckboxField extends React.Component {
    render() {
        const { name, placeholder } = this.props;
        return <Field name={name} type={'checkbox'} placeholder={name || placeholder} />;
    }
}

export default CheckboxField;

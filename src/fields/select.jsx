import React from 'react';
import { Field } from 'formik';

class SelectField extends React.Component {
    render() {
        const { name, placeholder, options = [] } = this.props;
        return <Field name={name} type="select" options={options} placeholder={name || placeholder} />;
    }
}

export default SelectField;

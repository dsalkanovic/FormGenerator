import React from 'react';
import { Field } from 'formik';

class FileField extends React.Component {
    render() {
        const { name, placeholder } = this.props;
        return <Field name={name} type={'file'} placeholder={name || placeholder} />;
    }
}

export default FileField;

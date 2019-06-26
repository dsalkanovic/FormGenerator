import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FormGroup, Spinner, Button, Tag } from '@blueprintjs/core';
import { uuid } from '../utilities/common';
import Upload from 'rc-upload';

import './fields.scss';

class FileField extends React.Component {
    defaultValue = [];

    constructor(props) {
        super(props);
        this.state = {
            pending: [],
            processed: []
        };

        this.setPendingFile = this.setPendingFile.bind(this);
        this.setProcessedFile = this.setProcessedFile.bind(this);
        this.processFile = this.processFile.bind(this);
    }

    setPendingFile = (file, cb) => {
        this.setState({ ...this.state, pending: [...this.state.pending, file] }, cb);
    };
    setProcessedFile = (file, field) => {
        const pending = [...this.state.pending.filter(pend => pend.id !== file.id)];
        this.setState(
            {
                ...this.state,
                processed: [...this.state.processed, file],
                pending
            },
            () => this.onChange(this.state.processed, field)
        );
    };
    onRemove = (id, field) => {
        const processed = this.state.processed.filter(f => f.id !== id);
        this.setState({ ...this.state, processed }, () => this.onChange(processed, field));
    };

    processFile = ({ id, file }, field) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let fileInfo = {
                id,
                name: file.name,
                type: file.type,
                size: Math.round(file.size / 1000) + ' kB',
                base64: reader.result,
                file: file
            };

            this.setProcessedFile(fileInfo, field);
        };
    };

    onChange = (value, { onChange }) => {
        const { id, name } = this.props;
        onChange({
            persist: () => {},
            target: {
                type: 'change',
                id,
                name,
                value
            }
        });
    };

    render() {
        const {
            id = uuid(),
            name,
            multi = false,
            types = [],
            validate,
            label,
            placeholder,
            info,
            className
        } = this.props;

        const uploadProps = field => ({
            action: 'api uri',
            type: 'drag',
            accept: types.join(','),
            multiple: multi,
            beforeUpload: file => {
                const fileObject = { file, id: uuid() };
                this.setPendingFile(fileObject, () => this.processFile(fileObject, field));
            },
            onStart: () => null,
            onSuccess: () => null,
            onProgress: () => null,
            onError: () => null,
            customRequest: () => null
        });

        return (
            <Field
                name={name}
                validate={validate}
                render={({ field }) => {
                    return (
                        <FormGroup
                            helperText={
                                <span className="validation-message">
                                    <ErrorMessage name={name} />
                                </span>
                            }
                            label={label}
                            labelFor={id}
                            labelInfo={info}
                            className={className}
                        >
                            <div>
                                {this.state.pending.length > 0 && <Spinner size={15} />}
                                {this.state.processed.map((p, i) => (
                                    <Tag
                                        key={i}
                                        minimal={true}
                                        onRemove={() => this.onRemove(p.id, field)}
                                        fill={true}
                                        className="mg-b-5"
                                    >
                                        {p.name}
                                    </Tag>
                                ))}
                                <Upload
                                    {...uploadProps(field)}
                                    beforeUpload={file => {
                                        const fileObject = { file, id: uuid() };
                                        this.setPendingFile(fileObject, () => this.processFile(fileObject, field));
                                    }}
                                >
                                    <Button rightIcon="upload" text={placeholder} />
                                </Upload>
                            </div>
                        </FormGroup>
                    );
                }}
            />
        );
    }
}

export default FileField;

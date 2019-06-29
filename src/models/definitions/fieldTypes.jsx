import { TextFieldDefinition } from './text';

export const FiledTypes = {
    Page: { name: 'FT_PAGE', label: 'Page', icon: 'applications', rank: 1000 },
    Group: { name: 'FT_GROUP', label: 'Group', icon: 'application', rank: 900 },
    Text: {
        name: 'FT_TEXT',
        label: 'Text',
        buildDefinition: d => new TextFieldDefinition(d),
        icon: 'new-text-box',
        rank: 100
    },
    Number: {
        name: 'FT_NUMBER',
        label: 'Number',
        buildDefinition: d => new TextFieldDefinition(d),
        icon: 'numerical',
        rank: 100
    },
    Select: {
        name: 'FT_SELECT',
        label: 'Select',
        buildDefinition: d => new TextFieldDefinition(d),
        icon: 'property',
        rank: 100
    },
    Boolean: {
        name: 'FT_BOOLEAN',
        label: 'Checkbox',
        buildDefinition: d => new TextFieldDefinition(d),
        icon: 'form',
        rank: 100
    },
    Date: {
        name: 'FT_DATE',
        label: 'Date',
        buildDefinition: d => new TextFieldDefinition(d),
        icon: 'calendar',
        rank: 100
    },
    File: {
        name: 'FT_FILE',
        label: 'File',
        buildDefinition: d => new TextFieldDefinition(d),
        icon: 'cloud-upload',
        rank: 100
    }
};

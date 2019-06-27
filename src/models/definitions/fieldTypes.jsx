import { TextFieldDefinition } from './text';

export const FiledTypes = {
    Page: { name: 'FT_PAGE', labe: 'Page', icon: 'File', rank: 1000 },
    Group: { name: 'FT_GROUP', labe: 'Group', icon: 'Bookmark', rank: 900 },
    Text: { name: 'FT_TEXT', labe: 'Text', buildDefinition: d => new TextFieldDefinition(d), icon: 'Type', rank: 100 },
    Number: {
        name: 'FT_NUMBER',
        labe: 'Number',
        buildDefinition: d => new TextFieldDefinition(d),
        icon: 'Hash',
        rank: 100
    },
    Select: {
        name: 'FT_SELECT',
        labe: 'Select',
        buildDefinition: d => new TextFieldDefinition(d),
        icon: 'List',
        rank: 100
    },
    Boolean: {
        name: 'FT_BOOLEAN',
        labe: 'Checkbox',
        buildDefinition: d => new TextFieldDefinition(d),
        icon: 'ToggleLeft',
        rank: 100
    },
    Date: {
        name: 'FT_DATE',
        labe: 'Date',
        buildDefinition: d => new TextFieldDefinition(d),
        icon: 'Calendar',
        rank: 100
    },
    File: { name: 'FT_FILE', labe: 'File', buildDefinition: d => new TextFieldDefinition(d), icon: 'Upload', rank: 100 }
};

import { TextFieldDefinition } from './text';
import { File, Bookmark, Type, Hash, Calendar, List, ToggleLeft, Upload } from 'react-feather';

export const FiledTypes = {
    Page: { name: 'FT_PAGE', icon: File, rank: 1000 },
    Group: { name: 'FT_GROUP', icon: Bookmark, rank: 900 },
    Text: { name: 'FT_TEXT', buildDefinition: d => new TextFieldDefinition(d), icon: Type, rank: 100 },
    Number: { name: 'FT_NUMBER', buildDefinition: d => new TextFieldDefinition(d), icon: Hash, rank: 100 },
    Select: { name: 'FT_SELECT', buildDefinition: d => new TextFieldDefinition(d), icon: List, rank: 100 },
    Boolean: { name: 'FT_BOOLEAN', buildDefinition: d => new TextFieldDefinition(d), icon: ToggleLeft, rank: 100 },
    Date: { name: 'FT_DATE', buildDefinition: d => new TextFieldDefinition(d), icon: Calendar, rank: 100 },
    Document: { name: 'FT_DOCUMENT', buildDefinition: d => new TextFieldDefinition(d), icon: Upload, rank: 100 }
};

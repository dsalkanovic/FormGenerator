import { uuid } from '../utilities/common';
import { FieldTypes, buildTypeDefinitionDetails } from './definitions/fieldTypes';

export class Field {
    id;
    title;
    description;
    type;
    definition;
    width;
    order;
    visibleIf;

    constructor({
        id = uuid(8),
        type = FieldTypes.Text,
        definition = {},
        width = { mobile: 100, desktop: 100 },
        title = 'New Field',
        description,
        order = 0,
        visibleIf = true
    }) {
        this.id = id;
        this.title = title;
        this.description = description;

        this.type = type;
        this.definition = buildTypeDefinitionDetails(type, { ...this.definition, ...definition });
        this.width = width;

        this.order = order;
        this.visibleIf = visibleIf;
    }
}

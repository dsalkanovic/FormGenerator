import { uuid } from '../utilities/common';
import { FiledTypes } from './definitions/fieldTypes';

export class Field {
    id;
    title;
    description;
    type;
    definition;
    order;
    visibleIf;

    constructor({ id = uuid(), type = FiledTypes.Text, definition, title = 'New Field', description, order = 0, visibleIf = true }) {
        this.id = id;
        this.title = title;
        this.description = description;

        this.type = type;
        this.definition = this.type.buildDefinition(definition);

        this.order = order;
        this.visibleIf = visibleIf;
    }
}

import { uuid } from '../utilities/common';
import { Field } from './field';
import { FiledTypes } from './definitions/fieldTypes';

export class Group {
    id;
    title;
    description;
    order;
    visibleIf;
    fields;

    constructor({ id = uuid(), title = 'New Group', description, order = 0, visibleIf = true, fields = [] }) {
        this.id = id;
        this.title = title;
        this.type = FiledTypes.Group;
        this.description = description;
        this.order = order;
        this.visibleIf = visibleIf;
        this.fields = fields.map(f => new Field(f));
    }
}

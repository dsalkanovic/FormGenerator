import { uuid } from '../utilities/common';
import { Group } from './group';
import { FiledTypes } from './definitions/fieldTypes';

export class Page {
    id;
    title;
    type;
    description;
    header;
    order;
    visibleIf;
    groups;

    constructor({ id = uuid(), title = 'New Page', description, header, order = 0, visibleIf = true, groups = [] }) {
        this.id = id;
        this.title = title;
        this.type = FiledTypes.Page;
        this.description = description;
        this.header = header;
        this.order = order;
        this.visibleIf = visibleIf;
        this.groups = groups.map(g => new Group(g));
    }
}

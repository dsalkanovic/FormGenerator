import { uuid } from '../utilities/common';
import { Group } from './group';
import { FieldTypes } from './definitions/fieldTypes';

export class Page {
    id;
    property;
    title;
    type;
    header;
    order;
    visibleIf;
    groups;
    buttons;

    constructor(page = {}) {
        const {
            id = uuid(8),
            property,
            title = 'New Page',
            description = '',
            header = {},
            order = 0,
            visibleIf = true,
            groups = [],
            buttons = {}
        } = page;

        this.id = id;
        this.property = property || `page_${id}`;
        this.title = title;
        this.type = FieldTypes.Page;
        this.description = description;
        this.header = {
            description: '',
            image: '',
            show: true,
            showProgress: true,
            ...header
        };
        this.order = order;
        this.visibleIf = visibleIf;
        this.groups = groups.map(g => new Group(g));
        this.buttons = {
            cancel: { show: true, text: 'Cancel' },
            back: { show: true, text: 'Back' },
            save: { show: true, text: 'Save' },
            next: { show: true, text: 'Next' },
            ...buttons
        };
    }
}

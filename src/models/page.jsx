import { uuid } from '../utilities/common';
import { Group } from './group';
import { FiledTypes } from './definitions/fieldTypes';

export class Page {
    id;
    title;
    type;
    header;
    order;
    visibleIf;
    groups;
    buttons;

    constructor(page = {}) {
        const {
            id = uuid(),
            title = 'New Page',
            description = '',
            header = {},
            order = 0,
            visibleIf = true,
            groups = [],
            buttons = {}
        } = page;

        this.id = id;
        this.title = title;
        this.type = FiledTypes.Page;
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

import { Page } from './models/page';
import { Group } from './models/group';
import { Field } from './models/field';

export const TEST_PAGES = [
    new Page({
        title: 'Intro',
        groups: [
            new Group({ title: 'Personal Info', fields: [new Field({ title: 'Name' }), new Field({ title: 'Email' })] }),
            new Group({
                title: 'Location',
                fields: [new Field({ title: 'Country' }), new Field({ title: 'City' }), new Field({ title: 'Address' }), new Field({ title: 'Post Code' })]
            })
        ]
    }),
    new Page({
        title: 'Tax Details',
        groups: [
            new Group({ title: 'SSN', fields: [new Field({ title: 'Type' }), new Field({ title: 'Number' })] }),
            new Group({
                title: 'Registration',
                fields: [new Field({ title: 'Date' }), new Field({ title: 'Unit' })]
            })
        ]
    }),
    new Page({ title: 'Documents 1' }),
    new Page({ title: 'Documents 2' }),
    new Page({ title: 'Documents 3' }),
    new Page({ title: 'Documents 4' }),
    new Page({ title: 'Documents 5' }),
    new Page({ title: 'Documents 6' }),
    new Page({ title: 'Documents 7' })
];

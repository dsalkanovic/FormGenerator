import { Page } from './models/page';
import { Group } from './models/group';
import { Field } from './models/field';
import { FiledTypes } from './models/definitions/fieldTypes';

export const TEST_PAGES = [
    new Page({
        title: 'Intro',
        header: {
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a rutrum tellus. Fusce ut mauris id nunc bibendum fringilla. Cras rutrum non ipsum in malesuada. Aliquam semper est vitae magna laoreet sagittis. Integer maximus blandit dictum. Fusce iaculis lacus id quam blandit rhoncus. Sed accumsan massa ac turpis congue fringilla. Etiam rutrum elit non est lacinia, ut posuere velit fringilla. Sed vehicula pharetra elit in suscipit. Phasellus nec ultrices dui. Cras lectus est, fringilla ut velit ut, commodo ullamcorper justo. Maecenas facilisis diam in ante venenatis, sit amet porta nisi auctor. Aenean a ante ut nisi efficitur lacinia.',
            image: 'http://clipart-library.com/img/752503.jpg',
            show: true,
            showProgress: true
        },
        buttons: { next: { show: true, text: 'Move forward' } },
        groups: [
            new Group({
                title: 'Personal Info',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a rutrum tellus. Fusce ut mauris id nunc bibendum fringilla.',
                width: { desktop: 100, mobile: 100 },
                fields: [
                    new Field({ title: 'Name' }),
                    new Field({ title: 'Email' }),
                    new Field({ title: 'Age', type: FiledTypes.Number }),
                    new Field({ title: 'Sex', type: FiledTypes.Select }),
                    new Field({ title: 'Date of birth', type: FiledTypes.Date }),
                    new Field({ title: 'Eligible', type: FiledTypes.Boolean })
                ]
            }),
            new Group({
                title: 'Location',
                width: { desktop: 50, mobile: 100 },
                fields: [new Field({ title: 'Country' }), new Field({ title: 'City' })]
            }),
            new Group({
                title: 'Some other group',
                width: { desktop: 50, mobile: 100 },
                fields: [new Field({ title: 'Address' }), new Field({ title: 'Post Code' })]
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
    new Page({
        title: 'Lorem ipsum dolor',
        groups: [
            new Group({
                title:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                fields: [new Field({ title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' })]
            })
        ]
    })
];

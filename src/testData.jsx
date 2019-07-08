import { Page } from './models/page';
import { Group } from './models/group';
import { Field } from './models/field';
import { FieldTypes } from './models/definitions/fieldTypes';

export const TEST_PAGES = [
    new Page({
        title: 'Intro',
        property: 'intro',
        header: {
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a rutrum tellus. Fusce ut mauris id nunc bibendum fringilla. Cras rutrum non ipsum in malesuada. Aliquam semper est vitae magna laoreet sagittis. Integer maximus blandit dictum. Fusce iaculis lacus id quam blandit rhoncus. Sed accumsan massa ac turpis congue fringilla. Etiam rutrum elit non est lacinia, ut posuere velit fringilla. Sed vehicula pharetra elit in suscipit. Phasellus nec ultrices dui. Cras lectus est, fringilla ut velit ut, commodo ullamcorper justo. Maecenas facilisis diam in ante venenatis, sit amet porta nisi auctor. Aenean a ante ut nisi efficitur lacinia.',
            image: 'http://clipart-library.com/img/752503.jpg',
            show: true,
            showProgress: true
        },
        buttons: { next: { text: 'Lets Rock!' } },
        groups: [
            new Group({
                title: 'Personal Info',
                property: 'personal',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a rutrum tellus. Fusce ut mauris id nunc bibendum fringilla.',
                width: { desktop: 100, mobile: 100 },
                fields: [
                    new Field({
                        title: 'Name',
                        property: 'name',
                        width: { desktop: 50, mobile: 100 },
                        definition: { isRequired: true }
                    }),
                    new Field({
                        title: 'Email',
                        property: 'email',
                        width: { desktop: 50, mobile: 100 },
                        definition: { validation: 'email' }
                    }),
                    new Field({
                        title: 'Date of birth',
                        property: 'dateOfBirth',
                        width: { desktop: 50, mobile: 100 },
                        type: FieldTypes.Date,
                        definition: { format: 'MM/DD/YYYY' }
                    }),
                    new Field({
                        title: 'Sex',
                        property: 'sex',
                        width: { desktop: 50, mobile: 100 },
                        type: FieldTypes.Select,
                        definition: { options: ['Male', 'Female', 'Other'] }
                    }),
                    new Field({
                        title: 'Age',
                        property: 'age',
                        width: { desktop: 50, mobile: 100 },
                        type: FieldTypes.Number
                    }),
                    new Field({
                        title: 'Eligible',
                        property: 'eligible',
                        description: 'Is Eligible ?',
                        width: { desktop: 50, mobile: 100 },
                        type: FieldTypes.Boolean
                    })
                ]
            }),
            new Group({
                title: 'Pictures',
                property: 'images',
                width: { desktop: 100, mobile: 100 },
                fields: [
                    new Field({
                        title: 'Work',
                        description: '(upload some work pictures)',
                        property: 'work',
                        type: FieldTypes.File,
                        width: { desktop: 50, mobile: 100 },
                        definition: { isMulti: true }
                    }),
                    new Field({
                        title: 'Vacation',
                        description: '(upload some vacation pictures)',
                        property: 'vacation',
                        type: FieldTypes.File,
                        width: { desktop: 50, mobile: 100 },
                        definition: { isMulti: true }
                    })
                ]
            }),
            new Group({
                title: 'Location',
                property: 'location',
                width: { desktop: 50, mobile: 100 },
                fields: [
                    new Field({ title: 'Country', property: 'country' }),
                    new Field({ title: 'City', property: 'city' })
                ]
            }),
            new Group({
                title: 'Some other group',
                property: 'some',
                width: { desktop: 50, mobile: 100 },
                fields: [
                    new Field({ title: 'Address', property: 'address' }),
                    new Field({ title: 'Post Code', property: 'zip' })
                ]
            })
        ]
    })
    // new Page({
    //     title: 'Tax Details',
    //     groups: [
    //         new Group({ title: 'SSN', fields: [new Field({ title: 'Type' }), new Field({ title: 'Number' })] }),
    //         new Group({
    //             title: 'Registration',
    //             fields: [new Field({ title: 'Date' }), new Field({ title: 'Unit' })]
    //         })
    //     ]
    // }),
    // new Page({
    //     title: 'Lorem ipsum dolor',
    //     groups: [
    //         new Group({
    //             title:
    //                 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    //             fields: [new Field({ title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' })]
    //         })
    //     ]
    // })
];

export const resources = [{
    id: 2,
    title: 'Link 1',
    link: 'https://www.google.com',
    comment: 'Resource comment',
    bookmarked: false,
    createdDateTime: new Date().toISOString(),
    linkedResources: [{
        content: 'TResource comment'
    }, {
        content: 'Resource comment',
    }]
}, {
    id: 1,
    title: 'Link 2',
    link: 'https://www.google.com',
    comment: 'Resource content two',
    createdDateTime: new Date().toISOString(),
    bookmarked: true,
    linkedResources: [{
        content: 'ThisResource commentore.'
    }, {
        content: 'Here we are'
    }]
}, {
    id: 1,
    title: 'Link 3',
    link: 'https://www.google.com',
    comment: 'Resourcesss content two',
    createdDateTime: new Date().toISOString(),
    bookmarked: true,
    linkedResources: [{
        content: 'This is some more.'
    }, {
        content: 'Here we are'
    }]
}]
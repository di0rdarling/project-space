export const notes = [{
    id: 2,
    title: 'Note title two',
    content: 'Note content two',
    createdDateTime: new Date().toISOString(),
    bookmarked: false,
    tags: [{ tag: 'Personal', colour: '#118AB2' }, { tag: 'THEMIS', colour: '#06D6A0' }],
    additionalNotes: [{
        createdDateTime: new Date().toDateString(),
        content: 'This is some more.'
    }, {
        createdDateTime: new Date().toDateString(),
        content: 'Here we are'
    }]
}, {
    id: 3,
    title: 'Note title',
    content: 'Note content',
    createdDateTime: new Date().toISOString(),
    bookmarked: true,
    tags: [{ tag: 'Personal', colour: 'yellow' }],
    additionalNotes: [{ createdDateTime: new Date().toISOString(), content: 'This is some addtional notes.' }]
}, {
    id: 1,
    title: 'This should be a better title',
    content: 'Note content two',
    createdDateTime: new Date().toISOString(),
    bookmarked: false,
    tags: [],
    additionalNotes: [{
        createdDateTime: new Date().toDateString(),
        content: 'This is some more.'
    }, {
        createdDateTime: new Date().toDateString(),
        content: 'Here we are'
    }]
}]
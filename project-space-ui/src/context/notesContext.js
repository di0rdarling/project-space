import React, { useEffect } from 'react';
import { notes } from '../data/notes';

const NotesListStateContext = React.createContext(undefined);
const NotesListDispatchContext = React.createContext(undefined);

function notesListReducer(state, action) {

    switch (action.type) {
        case 'set notes':
            return action.payload;
        case 'create note':
            if (!state) {
                return [];
            } else {
                let id = state.length + 1 || 0
                let noteCreate = {
                    id: id,
                    title: action.payload.title,
                    content: action.payload.content,
                    createdDateTime: new Date().toISOString(),
                    bookmarked: false,
                    tags: action.payload.tags,
                    additionalNotes: []
                }
                let newNotesCreate = state.slice();
                newNotesCreate.push(noteCreate);
                return newNotesCreate;
            }
        case 'edit note':
            let newNotesEdit = state.filter((note) => {
                return note.id !== action.payload.id
            });
            newNotesEdit.push(action.payload);
            //Sort the new array by id in ascending order.
            newNotesEdit.sort((a, b) => {
                return a.id - b.id;
            })
            return [...newNotesEdit]
        case 'delete note':
            let newNotesDelete = state.filter((note) => note.id !== action.payload.id)
            return newNotesDelete;
        case 'add additional note':
            let notesCopyAdd = state.slice();
            //Find the parent note.
            let foundNoteAdd = notesCopyAdd.find(note => note.id === action.payload.id);
            let foundNoteAddIndex = notesCopyAdd.indexOf(foundNoteAdd);
            //Remove the parent note from the list.
            notesCopyAdd.splice(foundNoteAddIndex, 1);
            //Update the parent note.
            foundNoteAdd.additionalNotes = [{ createdDateTime: new Date().toISOString(), content: action.payload.additionalNote }, ...foundNoteAdd.additionalNotes]
            notesCopyAdd.push(foundNoteAdd);
            //Sort the new array by id in ascending order.
            notesCopyAdd.sort((a, b) => {
                return a.id - b.id;
            })
            return notesCopyAdd;
        case 'remove additional note':
            let notesCopyRemove = state.slice();
            //Find the parent note.
            let foundNoteRemove = notesCopyRemove.find(note => note.id === action.payload.id);
            let foundNoteRemoveIndex = notesCopyRemove.indexOf(foundNoteRemove);
            //Remove the parent note from the list.
            notesCopyRemove.splice(foundNoteRemoveIndex, 1);
            foundNoteRemove.additionalNotes.splice(foundNoteRemove.additionalNotes.indexOf(action.payload.additionalNoteContent))
            //Sort the new array by id in ascending order.
            notesCopyRemove.sort((a, b) => {
                return a.id - b.id;
            })
            return notesCopyRemove;
        default:
            throw new Error(`ERROR: Unable to perform reducer action "${action.type}`)
    }
}

export function NotesListProvider(props) {

    const [state, dispatch] = React.useReducer(notesListReducer, []);
    useEffect(() => {
        notes.sort((a, b) => {
            return a.id - b.id;
        })
        dispatch({
            type: 'set notes',
            payload: notes
        })
    }, [])

    return (
        <NotesListStateContext.Provider value={state}>
            <NotesListDispatchContext.Provider value={dispatch}>
                {props.children}
            </NotesListDispatchContext.Provider>
        </NotesListStateContext.Provider>
    )

}

export function useNotesListState() {
    const context = React.useContext(NotesListStateContext)
    if (context === undefined) {
        throw new Error('useNotesListState must be used within a NotesListProvider')
    }
    return context
}

export function useNotesListDispatch() {
    const context = React.useContext(NotesListDispatchContext)
    if (context === undefined) {
        throw new Error('useNotesListDispatch must be used within a NotesListProvider')
    }
    return context
}
import React, { useState } from 'react';
import { makeStyles, Button, TextField, Paper, Typography, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import { palette } from '../data/palette';
import { useNotesListDispatch } from '../context/notesContext';
import Footer from './footer';
import styled from 'styled-components';

const useStyles = makeStyles({
    root: {
        width: 400,
        padding: 24,
        marginBottom: 24,
        borderLeft: `solid ${palette.primaryColour}`
    },
    rootBottom: {
        marginTop: 24,
        justifyContent: 'flex-end'
    },
    text: {
        fontFamily: 'Montserrat',
        fontWeight: 700,
        fontSize: 19
    },
    createButton: {
        backgroundColor: palette.primaryColour,
        color: palette.secondaryColour,
        margin: 8
    },
    cancelButton: {
        border: `solid thin ${palette.primaryColour}`,
        margin: 8
    },
    createPopoutTextfield: {
        marginBottom: 16,
    },
    addTagContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    changeColourButton: {
        height: 100
    },
    changeColourButtonText: {
        fontFamily: 'Montserrat',
        fontWeight: 700,
        fontSize: 10
    },
    tagTextfield: {
        width: 100
    }
})

//TODO: Move to common components folder?
const TagButton = styled.button`
    background-color: ${props => props.tagColour};
    color: ${palette.secondaryColour};
    height: 30px;
    border: none;
    border-radius: 10px;
    margin-left: 8px;
    outline: none;
`;



export default function CreatePopout(props) {

    let classes = useStyles();
    let { closePopout } = props;
    //TODO Should also be able to create resources.
    let [noteCreate, setNoteCreate] = useState({
        title: "",
        content: "",
        tags: [{ tag: "", colour: "" }]
    })
    let [tagColour, setTagColor] = useState(palette.tagColours[0])
    let dispatch = useNotesListDispatch();

    const handleInput = (event) => {
        if (event.target.name === 'tag') {
            setNoteCreate({ ...noteCreate, tags: [{ tag: event.target.value, colour: tagColour }] })
        } else {
            setNoteCreate({ ...noteCreate, [event.target.name]: event.target.value })
        }
    }

    const createNote = () => {
        dispatch({
            type: 'create note',
            payload: noteCreate
        })
    }

    const changeTagColour = () => {
        let colourIndex = palette.tagColours.indexOf(tagColour);
        if (colourIndex !== palette.tagColours.length - 1) {
            setTagColor(palette.tagColours[colourIndex + 1]);
        } else {
            setTagColor(palette.tagColours[0]);
        }
    }

    return (
        <Paper className={classes.root}>
            <div>
                <Typography className={classes.text}>Create</Typography>
            </div>
            <div>
                <div className={classes.createPopoutTextfield}>
                    <TextField
                        name='title'
                        fullWidth
                        label='Title'
                        onChange={handleInput}
                    />
                </div>
                <div className={classes.createPopoutTextfield} >
                    <TextField
                        name='content'
                        fullWidth
                        label='Content'
                        multiline
                        onChange={handleInput}
                        required
                    />
                </div>
            </div>
            <div className={classes.rootBottom}>
                <div className={classes.addTagContainer}>
                    <TextField
                        className={classes.tagTextfield}
                        name='tag'
                        label='Add tag'
                        onChange={handleInput}
                    />
                    {/*  //TODO Replace to be button to change colour on press */}
                    <TagButton
                        onClick={() => changeTagColour()}
                        className={classes.changeColourButton}
                        tagColour={tagColour}
                    >
                        <Typography className={classes.changeColourButtonText}>Change Colour</Typography>
                    </TagButton>
                </div>
                <div>
                    <Footer
                        createDisabled={(noteCreate.content.length === 0)}
                        create={() => createNote()}
                        cancel={() => closePopout(false)}
                    />
                </div>
            </div>
        </Paper>
    )
}
import React, { useState } from 'react';
import { makeStyles, Button, TextField, Typography } from '@material-ui/core';
import { palette } from '../data/palette';
import CreatePopout from '../components/createPopout';
import { NotesListProvider } from '../context/notesContext';

const useStyles = makeStyles({
    root: {
        alignItems: 'center',
    },
    rootTop: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 32
    },
    rootTopLeft: {
        width: '50%'
    },
    rootTopRight: {
        width: '50%',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    rootBottom: {
        display: 'flex',
        justifyContent: 'center'
    },
    createButton: {
        backgroundColor: palette.primaryColour,
        color: palette.secondaryColour
    },
    createButtonDisabled: {
        backgroundColor: palette.lightGreyColour,
        color: palette.secondaryColour
    },
    createPopoutTextfield: {
        marginBottom: 16
    },
    title: {
        fontFamily: 'Montserrat',
        fontWeight: 700,
        fontSize: 30
    }
})

export default function TabHeader(props) {

    let classes = useStyles();
    let [popoutOpen, setPopoutOpen] = useState(false);

    return (
        <div className={classes.root}>
            <div className={classes.rootTop}>
                <div className={classes.rootTopLeft}>
                    <Typography className={classes.title}>{props.tab}</Typography>
                </div>
                <div className={classes.rootTopRight}>
                    <Button
                        disabled={popoutOpen}
                        className={popoutOpen ? classes.createButtonDisabled : classes.createButton}
                        onClick={() => setPopoutOpen(true)}
                    >CREATE</Button>
                </div>
            </div>
            <div className={classes.rootBottom}>
                {popoutOpen &&
                    <CreatePopout
                        closePopout={() => setPopoutOpen(false)}
                    />
                }
            </div>
        </div>
    )
}



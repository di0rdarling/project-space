import React from 'react';
import { makeStyles, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { palette } from '../data/palette';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 16
    },
    rootWithChecked: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16
    },
    buttonPrimary: {
        backgroundColor: palette.primaryColour,
        color: palette.secondaryColour,
        marginTop: 12,
    },
    buttonPrimaryDisabled: {
        backgroundColor: palette.lightGreyColour,
        color: palette.secondaryColour,
        marginTop: 12,
    },
    cancelButton: {
        backgroundColor: palette.secondaryColour,
        color: palette.primaryColour,
        border: `solid thin ${palette.primaryColour}`,
        marginTop: 12,
        marginRight: 8
    },
})

export default function Footer(props) {

    let classes = useStyles();
    let { cancel, save, saveDisabled, add, addDisabled, onChecked, create, createDisabled } = props;

    return (
        <div className={onChecked ? classes.rootWithChecked : classes.root}>
            {onChecked && (
                <div>
                    <FormControlLabel
                        onChange={() => onChecked()}
                        control={<Checkbox />}
                        label='Add another'
                    />
                </div>

            )}
            <div>
                {cancel && (
                    <Button
                        onClick={cancel}
                        className={classes.cancelButton}>CANCEL</Button>
                )}
                {create && (
                    <Button
                        disabled={createDisabled}
                        onClick={create}
                        className={createDisabled ? classes.buttonPrimaryDisabled : classes.buttonPrimary}>CREATE</Button>
                )}
                {save && (
                    <Button
                        disabled={saveDisabled}
                        onClick={save}
                        className={saveDisabled ? classes.buttonPrimaryDisabled : classes.buttonPrimary}>SAVE</Button>
                )}
                {add && (
                    <Button
                        disabled={addDisabled}
                        onClick={add}
                        className={classes.saveButton}>ADD</Button>
                )}
            </div>
        </div >
    )
}
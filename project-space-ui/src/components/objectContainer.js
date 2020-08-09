
import React from 'react';
import { makeStyles, Paper, Divider, IconButton, Checkbox } from '@material-ui/core';
import { palette } from '../data/palette';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/BorderColor';
import BookmarkIcon from '@material-ui/icons/StarBorder';
import BookmarkFilledIcon from '@material-ui/icons/Star';

const useStyles = makeStyles({
    root: {
        margin: 16,
        padding: 16,
        display: 'flex',
        borderTop: `solid ${palette.primaryColour}`,
        position: 'relative',
        minWidth: 500
    },
    rootActive: {
        margin: 16,
        padding: '24px 16px',
        display: 'flex',
        borderTop: `solid ${palette.warningColour}`,
        position: 'relative',
        minWidth: 500
    },
    sidebarRoot: {
        display: 'flex',
        justifyContent: 'center'
    },
    sideBarBottomContainer: {
        marginLeft: 7,
        height: '80%',
        display: 'flex',
        alignItems: 'flex-end'
    },
    sideBarButton: {
        marginBottom: 16
    },
    deleteIcon: {
        '&:hover': {
            color: '#BA2926'
        }
    },
    dividerVertical: {
        margin: '0px 16px'
    },
    bookmarkCheckboxContainer: {
        height: '20%',
        marginBottom: 16,
    },
    children: {
        width: '100%'
    }
})


export default function ObjectContainer(props) {

    let { children, isActive } = props;
    let classes = useStyles();
    let { isEditing, setEditing, deleteObject } = props;
    return (
        <Paper className={isActive ? classes.rootActive : classes.root}>
            <div className={classes.sidebarRoot}>
                <div>
                    <div className={classes.bookmarkCheckboxContainer}>
                        <Checkbox
                            style={{
                                color: 'red'
                            }}
                            icon={<BookmarkIcon />}
                            checkedIcon={<BookmarkFilledIcon className={classes.bookmarkChecked} />}
                        />
                    </div>
                    <div className={classes.sideBarBottomContainer}>
                        <div>
                            <div className={classes.editButton}>
                                <IconButton
                                    className={classes.sideBarButton}
                                    disabled={isEditing}
                                    size='small'
                                    onClick={setEditing}>
                                    <EditIcon />
                                </IconButton>
                            </div>
                            <div className={classes.sideBarButton}>
                                <IconButton
                                    onClick={deleteObject}
                                    size='small'>
                                    <DeleteIcon className={classes.deleteIcon} />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Divider className={classes.dividerVertical} orientation='vertical' />
                </div>
            </div>
            <div className={classes.children}>
                {children}
            </div>
        </Paper >
    )
}
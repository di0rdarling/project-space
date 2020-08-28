import React, { useState } from "react";
import {
  Box,
  Typography,
  makeStyles,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Button,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/CreateOutlined";
import DeleteIcon from "@material-ui/icons/CloseOutlined";
import LinkIcon from "@material-ui/icons/Link";
import { useProjectState } from "../../context/projectsContext";
import { palette } from "../../data/palette";
import { updateProject } from "../../integration/projects";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 900,
    border: "solid thin",
    height: 300,
    overflow: "scroll",
    margin: "16px 0px",
  },
  objectsListContainerHeader: {
    borderBottom: "solid thin",
    padding: theme.spacing(1),
    width: 870,
    backgroundColor: "wheat",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 1,
  },
  objectTable: {
    marginTop: 42,
  },
  createButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  createNoteButton: {
    backgroundColor: palette.secondaryButton,
    height: 50,
  },
  createButton: {
    backgroundColor: palette.secondaryButton,
    height: 25,
  },
  icon: {
    color: "black",
  },
  input: {
    borderRadius: 15,
    width: "70%",
    outline: "none",
    padding: "8px 16px",
    fontSize: 15,
    marginBottom: theme.spacing(2),
    border: "solid thin",
  },
  createNoteArea: {
    padding: theme.spacing(2),
    height: "100%",
    position: "relative",
  },
  noteTitle: {
    marginBottom: theme.spacing(1),
  },
  createButtonBottom: {
    float: "right",
    backgroundColor: palette.secondaryButton,
  },
  cancelButton: {
    border: "solid thin",
  },
  dueDateTextfield: {
    marginTop: theme.spacing(1),
  },
  tableRow: {
    position: "rel",
  },
}));

export default function NotesListContainer() {
  let classes = useStyles();
  let project = useProjectState();
  let [, setError] = useState({
    statusCode: null,
    errorMessage: null,
  });
  const [creatingNote, setCreatingNote] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    body: "",
    createdDateTime: null,
  });

  const createNote = async () => {
    newNote.createdDateTime = new Date().toISOString();
    if (!project.notes) {
      project.notes = [newNote];
    } else {
      project.notes.push(newNote);
    }
    try {
      await updateProject(project);
      //TODO: NEED TO REFLECT UPDATE ON BOARD.
    } catch (err) {
      setError({
        statusCode: err.statusCode,
        errorMessage: err.message,
      }); //TODO: Elaborate error handling.
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.objectsListContainerHeader}>
        <Typography>
          Notes ({project.notes ? project.notes.length : 0})
        </Typography>
        {project.notes && (
          <Button className={classes.createButton}>CREATE</Button>
        )}
      </Box>
      {project.notes ? (
        <TableContainer>
          <Table size="small" className={classes.objectTable}>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "70px" }}></TableCell>
                <TableCell>Heading</TableCell>
                <TableCell>Body</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            {project.notes && (
              <TableBody>
                {project.notes.map((note) => (
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>{note.heading}</TableCell>
                    <TableCell>{note.body}</TableCell>
                    <TableCell>Tags placeholder</TableCell>
                    <TableCell align="right">
                      <Button size="small">
                        <EditIcon className={classes.icon} />
                      </Button>
                      <IconButton size="small">
                        <LinkIcon className={classes.icon} />
                      </IconButton>
                      <IconButton size="small">
                        <DeleteIcon className={classes.icon} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      ) : (
        <>
          {creatingNote ? (
            <Box className={classes.createNoteArea}>
              <Typography className={classes.noteTitle}>Title</Typography>
              <input
                className={classes.input}
                onChange={(event) =>
                  setNewNote({ ...newNote, title: event.target.value })
                }
              />
              <Typography className={classes.noteTitle}>Body</Typography>
              <textarea
                className={classes.input}
                rows="5"
                onChange={(event) =>
                  setNewNote({ ...newNote, body: event.target.value })
                }
              />
              <Box>
                <Button className={classes.cancelButton}>CANCEL</Button>
                <Button
                  className={classes.createButtonBottom}
                  disabled={!newNote.body}
                  onClick={() => createNote()}
                >
                  CREATE
                </Button>
              </Box>
            </Box>
          ) : (
            <Box className={classes.createButtonContainer}>
              <Button
                className={classes.createNoteButton}
                onClick={() => setCreatingNote(true)}
              >
                CREATE NOTE
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

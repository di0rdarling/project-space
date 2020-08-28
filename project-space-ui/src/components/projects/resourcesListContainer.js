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
  createResourceButton: {
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
  createResourceArea: {
    padding: theme.spacing(2),
    height: "100%",
    position: "relative",
  },
  resourceName: {
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

export default function ResourcesListContainer() {
  let classes = useStyles();
  let project = useProjectState();
  let [, setError] = useState({
    statusCode: null,
    errorMessage: null,
  });
  const [creatingResource, setCreatingResource] = useState(false);
  const [newResource, setNewResource] = useState({
    name: "",
    link: "",
  });

  const createResource = async () => {
    if (!project.resources) {
      project.resources = [newResource];
    } else {
      project.resources.push(newResource);
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
          Resources ({project.resources ? project.resources.length : 0})
        </Typography>
        {project.resources && (
          <Button className={classes.createButton}>CREATE</Button>
        )}
      </Box>
      {project.resources ? (
        <TableContainer>
          <Table size="small" className={classes.objectTable}>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "70px" }}></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Link</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            {project.resources && (
              <TableBody>
                {project.resources.map((resources) => (
                  <TableRow>
                    <TableCell>
                      <IconButton size="small">
                        <EditIcon className={classes.icon} />
                      </IconButton>
                      <IconButton size="small">
                        <LinkIcon className={classes.icon} />
                      </IconButton>
                    </TableCell>
                    <TableCell>{resources.name}</TableCell>
                    <TableCell>{resources.link}</TableCell>
                    <TableCell>Tags placeholder</TableCell>
                    <TableCell align="right">
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
          {creatingResource ? (
            <Box className={classes.createResourceArea}>
              <Typography className={classes.resourceName}>Name</Typography>
              <input
                className={classes.input}
                onChange={(event) =>
                  setNewResource({ ...newResource, name: event.target.value })
                }
              />
              <Typography className={classes.resourceName}>Link</Typography>
              <input
                className={classes.input}
                onChange={(event) =>
                  setNewResource({ ...newResource, link: event.target.value })
                }
              />
              <Box>
                <Button className={classes.cancelButton}>CANCEL</Button>
                <Button
                  className={classes.createButtonBottom}
                  disabled={!newResource.link}
                  onClick={() => createResource()}
                >
                  CREATE
                </Button>
              </Box>
            </Box>
          ) : (
            <Box className={classes.createButtonContainer}>
              <Button
                className={classes.createResourceButton}
                onClick={() => setCreatingResource(true)}
              >
                CREATE RESOURCE
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

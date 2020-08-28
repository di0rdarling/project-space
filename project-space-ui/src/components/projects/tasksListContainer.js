import React, { useState, useEffect } from "react";
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
  Checkbox,
  TextField,
} from "@material-ui/core";
import AlarmIcon from "@material-ui/icons/AccessAlarmOutlined";
import EditIcon from "@material-ui/icons/CreateOutlined";
import DeleteIcon from "@material-ui/icons/CloseOutlined";
import LinkIcon from "@material-ui/icons/Link";
import { useProjectState } from "../../context/projectsContext";
import { palette } from "../../data/palette";
import { convertToReadableDate } from "../../utils/dateUtils";
import { updateProject } from "../../integration/projects";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 900,
    border: "solid thin",
    height: 300,
    overflow: "scroll",
    margin: "16px 0px",
  },
  rootBottom: {
    position: "absolute",
    bottom: "90px",
    width: "97%",
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
  createTaskButton: {
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
  },
  createTaskArea: {
    padding: theme.spacing(2),
    height: "100%",
    position: "relative",
  },
  taskTitle: {
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

export default function TasksListContainer() {
  let classes = useStyles();
  let project = useProjectState();
  let [error, setError] = useState({
    statusCode: null,
    errorMessage: null,
  });
  const [creatingTask, setCreatingTask] = useState(false);
  const [newTask, setNewTask] = useState({
    task: "",
    dueDate: new Date().toISOString(),
  });

  useEffect(() => {
    console.log(project);
  }, [project]);

  const createTask = async () => {
    let updatedProject = { ...project };
    if (!updatedProject.tasks) {
      updatedProject.tasks = [newTask];
    } else {
      updatedProject.tasks.push(newTask);
    }
    try {
      await updateProject(updatedProject);
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
          Tasks ({project.tasks ? project.tasks.length : 0})
        </Typography>
        {project.tasks && (
          <Button className={classes.createButton}>CREATE</Button>
        )}
      </Box>
      {project.tasks ? (
        <TableContainer>
          <Table size="small" className={classes.objectTable}>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "25px" }}></TableCell>
                <TableCell>Task</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            {project.tasks && (
              <TableBody>
                {project.tasks.map((task) => (
                  <TableRow>
                    <hr />
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>{task.task}</TableCell>
                    {/* //TODO: ADD TIME */}
                    <TableCell>{convertToReadableDate(task.dueDate)}</TableCell>
                    <TableCell>Tags placeholder</TableCell>
                    <TableCell align="right">
                      <EditIcon className={classes.icon} />
                      <IconButton size="small"></IconButton>
                      <IconButton size="small">
                        <AlarmIcon className={classes.icon} />
                      </IconButton>
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
          {creatingTask ? (
            <Box className={classes.createTaskArea}>
              <Typography className={classes.taskTitle}>Task</Typography>
              <input
                className={classes.input}
                onChange={(event) =>
                  setNewTask({ ...newTask, task: event.target.value })
                }
              />
              <Box>
                <form className={classes.container} noValidate>
                  <TextField
                    id="datetime-local"
                    label="Set due date"
                    type="datetime-local"
                    defaultValue={newTask.dueDate}
                    className={classes.dueDateTextfield}
                    onChange={(date) =>
                      setNewTask({ ...newTask, dueDate: date })
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
                <Box className={classes.rootBottom}>
                  <Button className={classes.cancelButton}>CANCEL</Button>
                  <Button
                    className={classes.createButtonBottom}
                    disabled={!newTask.task}
                    onClick={() => createTask()}
                  >
                    CREATE
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box className={classes.createButtonContainer}>
              <Button
                className={classes.createTaskButton}
                onClick={() => setCreatingTask(true)}
              >
                CREATE TASK
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

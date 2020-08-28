import React from "react";
import {
  makeStyles,
  Typography,
  Modal,
  Paper,
  Button,
} from "@material-ui/core";
import { useProject } from "../../context/projectsContext";
import { createProject } from "../../integration/projects";
import { palette } from "../../data/palette";

const useStyles = makeStyles({
  modal: {
    width: 500,
    margin: "auto",
  },
  createForm: {
    padding: 24,
    outline: "none",
  },
  createProjectText: {
    fontFamily: "Montserrat",
    fontWeight: 700,
    fontSize: 20,
    marginBottom: 16,
  },
  otherText: {
    fontFamily: "Montserrat",
    marginBottom: 8,
  },
  input: {
    borderRadius: 15,
    width: "70%",
    outline: "none",
    padding: "8px 16px",
    fontSize: 15,
    marginBottom: 16,
  },
  footer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginTop: 24,
  },
  createButton: {
    fontFamily: "Montserrat",
    background: palette.primaryColour,
    color: "white",
    fontWeight: 700,
  },
  cancelButton: {
    fontFamily: "Montserrat",
    background: palette.lightGrey,
    fontWeight: 700,
  },
});

export default function CreateProjectContainer(props) {
  let classes = useStyles();
  let { open, onClose } = props;
  let [newProject, dispatch] = useProject();

  const create = () => {
    createProject(newProject);
    onClose();
  };

  return (
    <Modal className={classes.modal} open={open}>
      <Paper className={classes.createForm}>
        <div>
          <Typography className={classes.createProjectText}>
            Create Project
          </Typography>
          <div>
            <Typography className={classes.otherText}>Project Name</Typography>
            <input
              className={classes.input}
              value={newProject.name}
              onChange={(event) => {
                dispatch({
                  type: "update project",
                  payload: {
                    key: "name",
                    value: event.target.value,
                  },
                });
              }}
            />
          </div>
          <div>
            <Typography className={classes.otherText}>
              Project Description
            </Typography>
            <input
              className={classes.input}
              onChange={(event) => {
                dispatch({
                  type: "update project",
                  payload: {
                    key: "description",
                    value: event.target.value,
                  },
                });
              }}
            />
          </div>
        </div>
        <div className={classes.footer}>
          <Button onClick={onClose} className={classes.cancelButton}>
            CANCEL
          </Button>
          <Button className={classes.createButton} onClick={create}>
            CREATE
          </Button>
        </div>
      </Paper>
    </Modal>
  );
}

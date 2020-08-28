import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import { useProjectState } from "../../context/projectsContext";
import { convertToReadableDate } from "../../utils/dateUtils";
import { palette } from "../../data/palette";
import OverviewContainer from "./overviewContainer";
import TasksListContainer from "./tasksListContainer";
import NotesListContainer from "./notesListContainer";
import ResourcesListContainer from "./resourcesListContainer";

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "95%",
    marginTop: 45,
  },
  left: {
    width: "30%",
    marginRight: 24,
  },
  right: {
    width: "70%",
    maxHeight: 1500,
  },
  projectName: {
    fontFamily: "Montserrat",
    fontSize: 24,
    marginBottom: 8,
  },
  createdDateTime: {
    fontFamily: "Montserrat",
    fontSize: 12,
  },
  descriptionHeaderText: {
    fontFamily: "Montserrat",
    fontSize: 18,
    margin: "8px 0px 4px 0px",
  },
  descriptionText: {
    fontSize: 15,
    fontFamily: "Montserrat",
  },
  objectsListContainer: {
    width: 900,
    border: "solid thin",
    height: 300,
    overflow: "scroll",
    margin: "16px 0px",
  },
  objectsListContainerHeader: {
    borderBottom: "solid thin",
    padding: 8,
    width: 870,
    backgroundColor: "wheat",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 1,
  },
  objectTable: {
    marginTop: 42,
  },
  createButton: {
    backgroundColor: palette.secondaryButton,
    height: 25,
  },
  icon: {
    color: "black",
  },
});

export default function ProjectContainer() {
  let classes = useStyles();
  let project = useProjectState();

  return (
    <>
      {project && (
        <Box className={classes.root}>
          <Box className={classes.left}>
            <Typography className={classes.projectName}>
              {project.name}
            </Typography>
            <Typography className={classes.createdDateTime}>
              Created {convertToReadableDate(project.createdDateTime)}
            </Typography>
            <Typography className={classes.createdDateTime}>
              Last updated{" "}
              {convertToReadableDate(project.modifiedDateTime, true)}
            </Typography>
            <Typography className={classes.descriptionHeaderText}>
              Description
            </Typography>
            <Typography className={classes.descriptionText}>
              {project.description}
            </Typography>
            <OverviewContainer />
          </Box>
          <Box className={classes.right}>
            <TasksListContainer />
            <NotesListContainer />
            <ResourcesListContainer />
          </Box>
        </Box>
      )}
    </>
  );
}

import React from "react";
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
import { useProjectState } from "../../context/projectsContext";
import { convertToReadableDate } from "../../utils/dateUtils";
import { palette } from "../../data/palette";
import EditIcon from "@material-ui/icons/CreateOutlined";
import DeleteIcon from "@material-ui/icons/CloseOutlined";
import LinkIcon from "@material-ui/icons/Link";
import OverviewContainer from "./overviewContainer";
import TasksListContainer from "./tasksListContainer";

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
            <Box className={classes.objectsListContainer}>
              <Box className={classes.objectsListContainerHeader}>
                <Typography>
                  Notes ({project.notes ? project.notes.length : 0})
                </Typography>
                <Button className={classes.createButton}>CREATE</Button>
              </Box>
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
                            <IconButton size="small">
                              <EditIcon className={classes.icon} />
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
            </Box>
            <Box className={classes.objectsListContainer}>
              <Box className={classes.objectsListContainerHeader}>
                <Typography>
                  Resources ({project.resources ? project.resources.length : 0})
                </Typography>
                <Button className={classes.createButton}>CREATE</Button>
              </Box>
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
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

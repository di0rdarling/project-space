const express = require("express");
const ProjectCreate = require("../models/projectCreate");
const Project = require("../models/project");
const app = express();

app.post("", async (request, response) => {
  await new ProjectCreate(request.body)
    .save()
    .then(() => {
      response.sendStatus(201);
    })
    .catch((err) => {
      response.status(500).send(err);
    });
});

app.get("/projects", async (request, response) => {
  await Project.find({})
    .then((projects) => {
      response.status(200).send(projects);
    })
    .catch((err) => {
      response.status(500).send(err);
    });
});

app.get("/project/:_id", async (request, response) => {
  await Project.findById(request.params._id)
    .exec()
    .then((project) => {
      response.status(200).send(project);
    })
    .catch((err) => {
      response.status(500).send(err);
    });
});

app.put("/project/:_id", async (request, response) => {
  await Project.findByIdAndUpdate(request.params._id, request, {
    new: true,
  })
    .then((projectEdit) => {
      response.status(200).send(projectEdit);
    })
    .catch((err) => {
      response.status(500).send(err);
    });
});

app.delete("/delete/project/:_id", async (request, response) => {
  await Project.findByIdAndRemove(request.params._id)
    .then((res) => {
      response.sendStatus(200);
    })
    .catch((err) => {
      response.status(500).send(err);
    });
});

module.exports = app;

require('dotenv').config();
const { getAllProjects, createProject, editProject, getProject, deleteProject } = require('./database/mongodb')
const Express = require("express");
const cors = require('cors')
const BodyParser = require("body-parser");
const ObjectId = require("mongodb").ObjectID;

var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors())

// < --------------- POST $ GET METHODS --------------> 

app.post("/project", (request, response) => {
    let project = {
        name: request.body.name,
        description: request.body.description || null,
        modifiedDateTime: null,
        createdDateTime: new Date().toISOString()
    }
    createProject(project, response);
});

app.get("/projects", (request, response) => {
    getAllProjects(response);
});

app.get("/project/:id", (request, response) => {
    getProject(request.params.id, response);
});

app.put("/project/:id", (request, response) => {
    let modifiedDateTime = new Date();
    modifiedDateTime.setSeconds(0);
    modifiedDateTime.setMilliseconds(0);

    let project = {
        _id: ObjectId(request.body._id),
        name: request.body.name,
        description: request.body.description || null,
        modifiedDateTime: modifiedDateTime.toISOString(),
        createdDateTime: request.body.createdDateTime,
    }
    editProject(project, response)
});

app.delete('/project/:id', (request, response) => {
    deleteProject(request.params.id, response)
})

app.use((request, result) => {
    result.status(400).send({ url: request.originalUrl + ' not found' })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => { });

module.exports = app;

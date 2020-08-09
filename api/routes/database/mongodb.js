const { mongoAtlasConnectionString, database, collection } = require('../config/config')

const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectID;
const client = new MongoClient(mongoAtlasConnectionString);

var col;
async function connectToDatabase(returnCollection) {

    try {
        await client.connect();
        col = client.db(database || 'projects_data').collection(collection || 'projects');
        if(returnCollection){
            return col;
        }
    } catch (err) {
        console.log(err.stack)
    }
}

async function createProject(project, response) {
    await connectToDatabase();
    col.insert(project, (error, result) => {
        if (error) {
            return response.status(404).send(error);
        }
        response.send(result.result);
    });
}

async function editProject(project, response) {
    await connectToDatabase();
    let query = {
        _id: ObjectId(project._id)
    }
    col.updateOne(query, { $set: project }, (error, result) => {
        if (error) {
            return response.status(404).send(err);
        }
        response.send(result)
    })
}

async function getProject(_id, response) {
    await connectToDatabase();
    let query = {
        _id: ObjectId(_id)
    }
    col.findOne(query, (error, result) => {
        if (error) {
            return response.status(404).send(error);
        }
        response.send(result);
    });
}

async function getAllProjects(response) {
    await connectToDatabase();
    if (col) {
        col.find({}).toArray((error, result) => {
            if (error) {
                return response.status(404).send(error);
            }
            response.send(result);
        });
    } else {
        response.status(503).send('Unable to connect to database.')
    }
}

async function deleteProject(_id, response) {
    await connectToDatabase();
    let query = {
        _id: ObjectId(_id)
    }
    col.deleteOne(query, (error, result) => {
        if (error) {
            return response.status(404).send(err);
        }
        response.send(result.result)
    })
}

module.exports = {
    connectToDatabase,
    createProject,
    editProject,
    getProject,
    getAllProjects,
    deleteProject,
}
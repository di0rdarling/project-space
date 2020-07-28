const { user, password, port, cluster, databaseName, collectionName } = require('../config/config')

// Atlas connection string;
const url = `mongodb+srv://${user}:${password}@${cluster}.j2me1.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`;
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectID;
const client = new MongoClient(url);

var database, collection;
async function connectToDatabase() {

    try {
        await client.connect();
        database = client.db(databaseName);
        collection = database.collection(collectionName);
    } catch (err) {
        console.log(err.stack)
    }
}

async function createProject(project, response) {
    await connectToDatabase();
    collection.insert(project, (error, result) => {
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
    collection.updateOne(query, { $set: project }, (error, result) => {
        if (error) {
            return response.status(404).send(err);
        }
        response.send(result.result)
    })
}

async function getProject(_id, response) {
    await connectToDatabase();
    console.log("id -db", _id)
    let query = {
        _id: ObjectId(_id)
    }
    collection.findOne(query, (error, result) => {
        if (error) {
            return response.status(404).send(error);
        }
        response.send(result);
    });
}

async function getAllProjects(response) {
    await connectToDatabase();
    collection.find({}).toArray((error, result) => {
        if (error) {
            return response.status(404).send(error);
        }
        response.send(result);
    });
}

async function deleteProject(_id, response) {
    await connectToDatabase();
    let query = {
        _id: ObjectId(_id)
    }
    collection.deleteOne(query, (error, result) => {
        if (error) {
            return response.status(404).send(err);
        }
        response.send(result.result)
    })
}

module.exports = {
    createProject,
    editProject,
    getProject,
    getAllProjects,
    deleteProject,
}
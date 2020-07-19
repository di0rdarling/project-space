const { MongoClient } = require("mongodb");
const Express = require("express");
const BodyParser = require("body-parser");
const ObjectId = require("mongodb").ObjectID;

// Atlas connection string;
const url = "mongodb+srv://name:password@databases.j2me1.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const client = new MongoClient(url);
// The database to use
const dbName = "projects_data";
// The collection to use
const colName = "projects";

var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;
async function connectToMongoCluster() {

    try {
        //Connect tot the client
        await client.connect();
        //Fetch database by name;
        database = client.db(dbName);
        console.log(`Connected to database: ${dbName}`);
        //Fetch collection by name;
        collection = database.collection(colName)
        console.log(`Connected to collection: ${colName}`);
    } catch (err) {
        console.log(err.stack)
    }
}


// < --------------- POST $ GET METHODS --------------> 

app.post("/project", (request, response) => {
    collection.insert(request.body, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });

});

app.get("/projects", (request, response) => {
    // We have no query conditions, hence the empty {} in the find command.
    collection.find({}).toArray((error, result) => {
        if (error) {

            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/projects/:id", (request, response) => {
    collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.use((request, result) => {
    result.status(404).send({ url: request.originalUrl + ' not found' })
})

app.listen(8080, () => {
    connectToMongoCluster();
});

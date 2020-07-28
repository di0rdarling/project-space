const env = process.env.NODE_ENV;
const config = require('dotenv').config({ path: `${env}.env` });
if (config.error) {
    throw config.error;
}
const { parsed: envs } = config;
console.log(envs);
module.exports = {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_USER_PASSWORD,
    cluster: process.env.CLUSTER,
    databaseName: process.env.DATABASE_NAME,
    collectionName: process.env.COLLECTION_NAME,
    port: process.env.PORT
}

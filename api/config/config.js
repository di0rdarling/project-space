const env = process.env.NODE_ENV;
const config = require('dotenv').config();
if (config.error) {
    throw config.error;
}
const { parsed: envs } = config;
console.log(envs);
module.exports = {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_USER_PASSWORD,
    port: process.env.PORT
}

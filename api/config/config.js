const env = process.env.NODE_ENV;
require('dotenv').config();
module.exports = {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_USER_PASSWORD,
    port: process.env.PORT
}

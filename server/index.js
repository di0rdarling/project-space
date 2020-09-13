const express = require("express");
require("dotenv").config();
const { mongoAtlasConnectionString } = require("./config/config");
const cors = require("cors");
const BodyParser = require("body-parser");
const mongoose = require("mongoose");
const projectRouter = require("./routes/projectRoutes");

var app = express();
app.use(express.json());
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

mongoose.connect(mongoAtlasConnectionString);

app.use(projectRouter);

app.use((request, result) => {
  result.status(400).send({ url: request.originalUrl + " not found" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {});

module.exports = app;

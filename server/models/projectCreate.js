const mongoose = require("mongoose");
const config = require("../config/config");

let createdDateTime = new Date().toISOString();

const ProjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    validate(value) {
      if (value === undefined) throw new Error("A project name must be set.");
    },
  },
  description: {
    type: String,
  },
  createdDateTime: {
    type: String,
    default: createdDateTime,
  },
});

module.exports = mongoose.model(
  "ProjectCreate",
  ProjectSchema,
  config.database
);

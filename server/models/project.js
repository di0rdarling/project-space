const mongoose = require("mongoose");
const config = require("../config/config");

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
  modifiedDateTime: {
    type: String,
  },
  createdDateTime: {
    type: String,
  },
  tasks: {
    type: Array,
  },
  notes: {
    type: Array,
  },
  resources: {
    type: Array,
  },
});

module.exports = mongoose.model("Project", ProjectSchema, config.database);

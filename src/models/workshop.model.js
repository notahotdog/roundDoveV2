const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Decides if item is visible
const itemSchema = new Schema({
  name: {
    type: String,
  },
  visible: {
    type: Boolean,
  },
});

//TODO - Decide on the name, and populate contents
const fieldSchema = new Schema({});

const subnodeSchema = new Schema({
  subnodeName: {
    type: String,
  },
  hazards: {
    type: [fieldSchema],
  },
});

const nodeSchema = new Schema({
  nodeName: {
    type: String,
  },
  subnodes: {
    type: [subnodeSchema],
  },
});

const workshopSchema = new Schema({
  workshopName: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: ["pending"],
  },
  nodes: {
    type: [nodeSchema],
  },
});

//TODO - Understand how this code works
const workshop = mongoose.model("workshop", workshopSchema, "workshop"); //The first param specifies the collection name
module.exports = workshop;

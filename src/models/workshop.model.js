const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Decides if item is visible
const itemVisibleSchema = new Schema({
  name: {
    type: String,
  },
  visible: {
    type: Boolean,
  },
});

//TODO - Decide on the name, and populate contents - changed From Hazard Schema - How is this different from item.model //TODO - suggestion allocated
const itemSchema = new Schema({
  itemName: {
    type: String,
  },
  suggestionAllocated: {
    //Todo - check against this with other components
    type: Boolean,
  },
  detail1: {
    type: [itemVisibleSchema],
  },
  detail2: {
    type: [itemVisibleSchema],
  },
  detail3: {
    type: [itemVisibleSchema],
  },
  detail4: {
    type: [itemVisibleSchema],
  },
});

const subnodeSchema = new Schema({
  subnodeName: {
    type: String,
  },
  items: {
    type: [itemSchema],
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

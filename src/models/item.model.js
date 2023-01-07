const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Used for different item types - for e.g fire, water hazard etc //TODO - Check whether important
const itemSchema = new Schema({
  itemName: {
    type: String,
  },
  detail1: {
    type: [String],
  },
  detail2: {
    type: [String],
  },
  detail3: {
    type: [String],
  },
  detail4: {
    type: [String],
  },
});

//model(collectionName,collectionSchema,)
const itemDatabase = mongoose.model("item", itemSchema);
module.exports = itemDatabase;

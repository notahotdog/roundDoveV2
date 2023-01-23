const router = require("express").Router();
let Workshop = require("../models/workshop.model");
let Suggestion = require("../models/item.model");

var exportFile = require("../util/export2Excel.js");

//Suggestions - SOURCE CODE //TODO - Complete all the different functionality

/**
 * GET - Retrieve Suggestions data from endpoint
 */
router.route("/suggestions").get((req, res) => {
  Suggestion.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/suggestions/:id").get((req, res) => {
  console.log("id:", req.params.id);
  Suggestion.findById(req.params.id)
    .then((suggestionDetails) => res.json(suggestionDetails))
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * POST - Add suggestions
 */
router.route("/addSuggestions").post((req, res) => {
  const itemName = req.body.itemName;
  const detail1 = req.body.detail1;
  const detail2 = req.body.detail2;
  const detail3 = req.body.detail3;
  const detail4 = req.body.detail4;

  const newSuggestion = new Suggestion({
    itemName,
    detail1,
    detail2,
    detail3,
    detail4,
  });

  console.log("Router Saving Suggestion");

  newSuggestion
    .save()
    .then(() => res.json("Suggestion Added"))
    .catch((err) => res.status(400).json("Error" + err));
});

//Delete Suggestion
router.route("/deleteSuggestion").delete((req, res) => {
  const id = req.body.id;
  console.log("id:", id);
  Suggestion.findByIdAndDelete(id)
    .then(() => res.json("Suggestion Deleted"))
    .catch((err) => res.status(404).json("Error" + err));
});

//POST - Update Suggestion
router.route("/updateSuggestion").post((req, res) => {
  const id = req.body.id; //Id to update the suggestion
  const itemName = req.body.itemName;
  const detail1 = req.body.detail1;
  const detail2 = req.body.detail2;
  const detail3 = req.body.detail3;
  const detail4 = req.body.detail4;

  // console.log("UPDATING SUGGESTION: id: ", id);

  const updatedSuggestion = {
    itemName,
    detail1,
    detail2,
    detail3,
    detail4,
  };

  Suggestion.findByIdAndUpdate(id, updatedSuggestion)
    .then(() => res.json("Suggestion Updated"))
    .catch((err) => res.status(404).json("Error: " + err));
});

//GET - All Workshop data
router.route("/").get((req, res) => {
  Workshop.find()
    .then((workshops) => res.json(workshops))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Individual Workshop Data Methods
//GET - Individual workshop data based on id
router.route("/:id").get((req, res) => {
  Workshop.findById(req.params.id)
    .then((workshopDetails) => res.json(workshopDetails))
    .catch((err) => res.status(400).json("Error: " + err));
});

//DELETE - Workshop based on id - Working
router.route("/:id").delete((req, res) => {
  Workshop.findByIdAndDelete(req.params.id)
    .then(() => res.json("Workshop deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//POST - Add Workshop to db
router.route("/addWorkshop").post((req, res) => {
  const workshopName = req.body.workshopName;
  const tags = req.body.tags;
  const nodes = req.body.nodes;

  const newWorkshop = new Workshop({
    workshopName,
    tags,
    nodes,
  });

  newWorkshop
    .save()
    .then(() => res.json("Workshop Added"))
    .catch((err) => res.status(400).json("Error" + err));
});

//POST - Update workshopData from list of Workshop
router.route("/updateWorkshop").post((req, res) => {
  console.log("Update Workshop triggered");
  const nodes = req.body.nodes || [];
  const workshopName = req.body.workshopName;
  const tags = req.body.tags;
  const workshopID = req.body.id;

  var workshop = {
    workshopName,
    nodes,
    tags,
  };

  // console.log("workshop data", JSON.stringify(workshop));

  Workshop.findByIdAndUpdate(workshopID, workshop)
    .then(() => res.json("Workshop Updated"))
    .catch((err) => res.status(404).json("Error: " + err));
});

///POST - Export workshop data as excelFile
router.route("/exportToExcel").post((req, res) => {
  const jsonData = req.body;
  var excelData = exportFile.saveToExcel(jsonData);
  excelData.write("WorkshopExcel.xlsx", res); //TODO - Replace "WorkshopExcel" with N// ame of file required
});

module.exports = router;

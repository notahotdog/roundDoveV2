const router = require("express").Router();
let Workshop = require("../models/workshop.model");
let Item = require("../models/item.model"); //to obtain itemSchema

var exportFile = require("../util/export2Excel.js");

//To Handle GET Requests
router.route("/").get((req, res) => {
  Workshop.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

//POST Request - Add Workshop
router.route("/addWorkshop").post((req, res) => {
  const workshopName = req.body.workshopName;
  const tags = req.body.tags;
  const nodes = req.body.nodes;

  const newWorkshop = new Workshop({
    workshopName,
    tags,
    nodes,
  });

  console.log("Router Saving Workshop");

  newWorkshop
    .save()
    .then(() => res.json("Workshop Added"))
    .catch((err) => res.status(400).json("Error" + err));
});

//Update Workshop
router.route("/updateWorkshop").post((req, res) => {
  const nodes = req.body.nodes;
  const workshopName = req.body.workshopName;
  const tags = req.body.tags;

  var workshop = {
    workshopName,
    nodes,
    tags,
  };

  console.log("workshop data", JSON.stringify(workshop));

  Workshop.findByIdAndUpdate(req.body.id, workshop)
    .then(() => res.json("Workshop Updated"))
    .catch((err) => res.status(404).json("Error: " + err));
});

//Get Workshop Data
router.route("/workshopDetails/:id").get((req, res) => {
  Workshop.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Workshop.findByIdAndDelete(req.params.id)
    .then(() => res.json("Workshop deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * Retrieve Item Data from endpoint
 */
router.route("/item").get((req, res) => {
  Item.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error" + err));
});

/**
 * Add Hazard to endpoint //TODO-Whichever endpoint that calls this needs to change the fields it passes
 */
router.route("/addItem").post((req, res) => {
  const itemName = req.body.itemName;
  const detail1 = req.body.detail1;
  const detail2 = req.body.detail2;
  const detail3 = req.body.detail3;
  const detail4 = req.body.detail4;

  const newItem = new Item({
    itemName,
    detail1,
    detail2,
    detail3,
    detail4,
  });

  console.log("Router Saving Item");

  newItem
    .save()
    .then(() => res.json("Item Added"))
    .catch((err) => res.status(400).json("Error" + err));
});

///Delete Item
router.route("/deleteItem").delete((req, res) => {
  Item.findByIdAndDelete(req.body.id)
    .then(() => res.json("Item Deleted"))
    .catch((err) => res.status(404).json("Error" + err));
});

//Update Item
router.route("/updateItem").post((req, res) => {
  const itemName = req.body.itemName;
  const detail1 = req.body.detail1;
  const detail2 = req.body.detail2;
  const detail3 = req.body.detail3;
  const detail4 = req.body.detail4;

  var updatedItem = {
    itemName,
    detail1,
    detail2,
    detail3,
    detail4,
  };

  Item.findByIdAndUpdate(req.body.id, updatedItem)
    .then(() => res.json("Item Updated"))
    .catch((err) => res.status(404).json("Error: " + err));
});

///Used to export workshop data as pdf
router.route("/exportToExcel").post((req, res) => {
  const jsonData = req.body;
  var excelData = exportFile.saveToExcel(jsonData);
  excelData.write("WorkshopExcel.xlsx", res); //TODO - Replace "WorkshopExcel" with Name of file required
});

module.exports = router;

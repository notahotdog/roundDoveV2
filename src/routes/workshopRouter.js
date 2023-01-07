const router = require("express").Router();
let Workshop = require("../models/workshop.model");

var exportFile = require("../util/export2Excel.js");

//GET - All Workshop data
router.route("/").get((req, res) => {
  Workshop.find()
    .then((workshops) => res.json(workshops))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/testPoint").get((req, res) => {
  console.log("get item");
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

//POST - Update workshopData from list of Workshop //TODO - Check against edit functionality
router.route("/updateWorkshop").post((req, res) => {
  const nodes = req.body.nodes;
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

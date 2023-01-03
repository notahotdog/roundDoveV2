const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// app.use(cors());
app.use(cors({ exposedHeaders: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("PORT", process.env.PORT || 5000);

//Mongoose Connection
mongoose.set("strictQuery", false);
const url = "mongodb://localhost/roundDove";
mongoose.connect(url, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established succesfully");
});

const express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
var { Val } = require("./wdataval");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/linkdb");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST Method
app.post("/postdata", function(req, res) {
  var word = req.body;
  console.log(req.body);
  var feed = new Val(word);
  feed
    .save()
    .then(function(data) {
      res.json({ message: "Success" });
    })
    .catch(function(err) {
      res.status(500).json({ message: "Error" });
    });
});

// GET Method
app.get("/getdata/:stag", function(req, res) {
  var sta = req.params.stag.split(",");

  console.log(sta);
  Val.find({ tag: { $in: sta } })
    .then(function(word) {
      res.json({ word });
    })
    .catch(function(err) {
      res.status(500).json({ message: "Error" });
    });
});
//get all
app.get("/getdata", function(req, res) {
  Val.find()
    .then(function(word) {
      res.json({ word });
    })
    .catch(function(err) {
      res.status(500).json({ message: "Error" });
    });
});

app.listen(3000);

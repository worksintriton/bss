const path = require("path");
const api = require("./api");
const config = require("config");
const utils = require("./utils");
var express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const expressSession = require("express-session");
var fs = require("fs");
var stripWhitespace = require("strip-whitespace");
const https = require("https");
var middleware = require("./api/middleware");
var cors = require("cors");
const model = require("./model/index");
require("./db/database");
require("./model/index");
var app = express();

var jsonParser = bodyParser.json({
  limit: 1024 * 1024 * 20,
  type: "application/json",
});
var urlencodedParser = bodyParser.urlencoded({
  extended: true,
  limit: 1024 * 1024 * 20,
  type: "application/x-www-form-urlencoding",
});

app.use(jsonParser);
app.use(urlencodedParser);

app.use("*", [
  cors(),
  middleware.passport.initialize(),
  middleware.passport.session(),
]);
app.options("*", cors());

app.use(cookieParser());
app.use(
  expressSession({
    secret: "Flatmanagement",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "www")));

// Geo-location
const apiKey = "AIzaSyCQ4r9BQzgAXLZHaxL7u1OZxAOILRjoSOE";

app.post("/search_places", async (req, res) => {
  const query = req.body.query;
  const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//nearby place

app.post("/search_nearby_places", async (req, res) => {
  const { latitude, longitude, radius, type } = req.body;
  // Construct the API URL
  const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;
  try {
    // Make a request to the Google Places API
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// select place on geo location

app.post("/select_places", async (req, res) => {
  const query = req.body.query;
  const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${query}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/list", async (req, res) => {
  const record = await model.clientsite.find({});
  return res.json({ data: record });
});

app.get("/filterduserlist", async (req, res) => {
  const empIds = [];
  const record = await model.mapusers.find({ status: "open" }, { Emp_id: 1 });
  for (const iterator of record) {
    empIds.push(iterator.Emp_id);
  }
  const employees = await model.usermanage.find({
    Empolyee_id: { $nin: empIds },
  });
  return res.json({ data: employees, status: "Success", code: 200 });
});

app.post("/updateuserstatus", async (req, res) => {
  const record = await model.mapusers.findOneAndUpdate(
    { Emp_id: req.body.Emp_id },
    { $set: { status: req.body.status } }
  );

  return res.json({
    data: {},
    message: "updated successfully",
    status: "Success",
    code: 200,
  });
});

app.use(api.router);

function runServer() {
  api.init();
  var port = process.env.PORT || 3000;
  app.listen(port, function () {
    console.info("Application listening on port " + port);
  });
}

runServer();

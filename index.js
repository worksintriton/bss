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
  console.log("req.body.query", req.body);
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

// select place on geo location

app.post("/select_places", async (req, res) => {
  console.log("req.body.query", req.body);
  const query = req.body.query;
  const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${query}&key=${apiKey}`;
  // const api = ''
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
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

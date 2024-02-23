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
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
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
  const record = await model.mapusers.find({ status: "Open" }, { Emp_id: 1 });
  for (const iterator of record) {
    empIds.push(iterator.Emp_id);
  }
  const employees = await model.usermanage.find({
    Empolyee_id: { $nin: empIds },
  });
  console.log(employees);
  return res.json({ data: employees, status: "Success", code: 200 });
});

app.post("/updateuserstatus", async (req, res) => {
  const record = await model.mapusers.findOneAndDelete({
    Emp_id: req.body.Emp_id,
    Map_id: req.body.Map_id,
  });

  return res.json({
    data: {},
    message: "updated successfully",
    status: "Success",
    code: 200,
  });
});

app.post("/checkin", async (req, res) => {
  try {
    const endOfDay = new Date(req.body.date);
    endOfDay.setHours(23, 59, 59, 999);

    const record = await model.attendance.aggregate([
      {
        $match: {
          site_id: new ObjectId(req.body.site_id),
        },
      },
      {
        $match: {
          createdAt: { $gte: new Date(req.body.date), $lte: endOfDay },
        },
      },
      {
        $group: {
          _id: "$employee_id",
          rec: {
            $last: "$$ROOT",
          },
        },
      },
      {
        $unwind: {
          path: "$rec",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    const rec = [];
    if (record.length > 0) {
      record.forEach((el) => {
        if (el.rec.check === "In") {
          rec.push(el.rec);
        }
      });
    }

    return res.json({ status: "Success", code: 200, data: rec });
  } catch (error) {
    console.log(error);
  }
});

//checkout

app.post("/checkout", async (req, res) => {
  try {
    const endOfDay = new Date(req.body.date);
    endOfDay.setHours(23, 59, 59, 999);

    const record = await model.attendance.aggregate([
      {
        $match: {
          site_id: new ObjectId(req.body.site_id),
        },
      },
      {
        $match: {
          createdAt: { $gte: new Date(req.body.date), $lte: endOfDay },
        },
      },
      {
        $group: {
          _id: "$employee_id",
          record: {
            $last: "$$ROOT",
          },
        },
      },
      {
        $unwind: {
          path: "$record",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    const rec = [];
    if (record.length > 0) {
      record.forEach((el) => {
        if (el.record.check === "Out") {
          rec.push(el.record);
        }
      });
    }

    const empIds = await model.attendance.find(
      {
        site_id: new ObjectId(req.body.site_id),
        createdAt: { $gte: new Date(req.body.date), $lte: endOfDay },
      },
      { employee_id: 1 }
    );

    const ids = [];

    empIds.forEach((el) => {
      ids.push(el.employee_id);
    });

    let uniqueIds = Array.from(new Set(ids));

    const getRemainingRec = await model.mapusers.find({
      Map_id: new ObjectId(req.body.site_id),
      Emp_id: { $nin: uniqueIds },
      // createdAt: { $gte: new Date(req.body.date), $lte: endOfDay },
    });
    if (getRemainingRec.length > 0) {
      getRemainingRec.forEach((el) => {
        rec.push({
          _id: el._id,
          employee_id: el.Emp_id,
          name: el.Employee_name,
          site_id: el.Map_id,
          gender: el.gender,
          contact_no: el.contact_no,
          Client_place: el.Client_place,
          Address: el.Address,
          status: el.status,
          notification_title: el.notification_title,
          updatedAt: el.updatedAt,
          createdAt: el.createdAt,
          __v: el.__v,
        });
      });
    }

    return res.json({ status: "Success", code: 200, data: rec });
  } catch (error) {
    console.log(error);
  }
});

app.get("/supervisor", async (req, res) => {
  try {
    const supervisorList = await model.usermanage.find({
      Designation: "Supervisor",
    });
    return res.json({ data: supervisorList, status: "success", code: 200 });
  } catch (error) {
    console.log(error);
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

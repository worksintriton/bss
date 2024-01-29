"use strict";

var _ = require("lodash"),
  db = require("../db"),
  async = require("async");

function login_page() {}

const model = require("../model/index");

login_page.bsslogincheck = async function (userInput, resultCallback) {
  await model.usermanage
    .findOne({ Email_id: userInput.Email_id, Password: userInput.password })
    .then((data) => {
      console.log(data.length);
      if (data.length == 0) {
        var string = "Invalid Account";
        resultCallback(null, string);
      } else {
        resultCallback(null, data);
      }
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

login_page.clientlogincheck = async function (userInput, resultCallback) {
  await model.clientmanagement
    .find({ login: userInput.Email_id, password: userInput.password })
    .then((data) => {
      console.log(data.length);
      if (data.length == 0) {
        resultCallback(null, {}, false);
      } else {
        resultCallback(null, data, true);
      }
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

login_page.securitytlogins = async function (userInput, resultCallback) {
  
  await model.employeedetails.findOne({Email_id:userInput.Email_id,Password:userInput.password})
    .then((data) => {
      console.log(data.length);
      if (data.length == 0) {
        var string = "Invalid Account";
        resultCallback(null, string);
      } else {
        resultCallback(null, data);
      }
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

module.exports = login_page;

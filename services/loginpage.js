"use strict";

var _ = require("lodash"),
  db = require("../db"),
  async = require("async");

function login_page() {}

const model = require("../model/index");
const { generateToken } = require("../utils/jwt");

login_page.bsslogincheck = async function (userInput, resultCallback) {
  await model.usermanage
    .findOne({
      Phone_number: userInput.Phone_number,
      Password: userInput.password,
    })
    .then(async (data) => {
      if (data?.length == 0 || data == null) {
        var string = "Invalid phone number or Password";
        resultCallback(null, string);
      } else {
        const token = await generateToken(data);
        console.log(data.length);
        data["_doc"].token = token;
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
  await model.employeedetails
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

module.exports = login_page;

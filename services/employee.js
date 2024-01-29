"use strict";

var _ = require("lodash"),
  db = require("../db"),
  async = require("async");

function employee() {}

const model = require("../model/index");

employee.EmployeeAuth = async function (userInput, resultCallback) {
  await model.employeedetails
    .find({
      $or: [
        { Email_ID: userInput.LoginKey },
        { Mobile_No: userInput.LoginKey },
      ],
    })
    .then((data) => {
      if (data.length > 0) {
        if (data[0].Password == userInput.Password) {
          resultCallback(null, 200, "Password MissMatched", data[0]);
          delete data[0].password;
        } else {
          resultCallback(null, 401, "Password MissMatched", {});
        }
      } else resultCallback(null, 401, "User Doesnot Exist", {});
      console.log(data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

employee.setUserId = async function (userInput, resultCallback) {
  await model.employeedetails
    .find({
      $or: [
        { Email_ID: userInput.LoginKey },
        { Mobile_No: userInput.LoginKey },
      ],
    })
    .then((data) => {
      if (data.length > 0) {
        resultCallback(null, true, data[0].id);
      } else resultCallback(null, false, 0);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

module.exports = employee;

"use strict";

var _ = require("lodash"),
  db = require("../db"),
  async = require("async");

function flatuser() {}
const model = require("../model/index");

flatuser.getuser_details = async function (userInput, resultCallback) {
  await model.user
    .find({ user_id: userInput.user_id })

    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

flatuser.add = async function (userInput, resultCallback) {
  await model
    .user.findOne({ email_id: userInput.email_id })

    .then(async (data) => {
      if (data.length > 0) {
        //eruthuchuna
        var string = {
          message: "This email_id already exits!",
          status: "falied",
        };
        resultCallback(null, string);
      } else {
        console.log("2");
        await model.user.create({
          flat_no: userInput.flat_no,
          block_name: userInput.block_name,
          user_name: userInput.user_name,
          user_phone: userInput.user_phone,
          password: userInput.password,
          email_id: userInput.email_id,
          owner_tent: userInput.owner_tent,
          type: userInput.type,
          appartment_name: userInput.appartment_name,
        });
        //! need to check (there is no table for user_login)
        executor
          .any('SELECT * FROM public.user_login WHERE "email_id"=($1) ', [
            userInput.email_id,
          ])
          .then((data) => {
            resultCallback(null, data);
          });
      }
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

module.exports = flatuser;

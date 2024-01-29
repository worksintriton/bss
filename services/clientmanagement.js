"use strict";

var _ = require("lodash"),
  db = require("../db"),
  async = require("async");

function clientmanagement() {}

const model = require("../model/index");

clientmanagement.employeereqiureds = async function (
  userInput,
  resultCallback
) {
  await model.clientmanagement
    .findOneAndUpdate(
      { cliid: userInput.cliid },
      {
        no_am: userInput.no_am,
        no_sup: userInput.no_sup,
        no_security: userInput.no_security,
        pay_sup: userInput.pay_sup,
        pay_am: userInput.pay_am,
        pay_security: userInput.pay_security,
        overtime_pay: userInput.overtime_pay,
        bsspay_am: userInput.bsspay_am,
        bsspay_security: userInput.bsspay_security,
        bsspay_sup: userInput.bsspay_sup,
        bssovertime_pay: userInput.bssovertime_pay,
        shift_type: userInput.shift_type,
        shift_hours: userInput.shift_hours,
      }
    )

    .then((data) => {
      console.log(data);
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, {});
      console.log("ERROR:", error);
    });
};

clientmanagement.add = async function (userInput, resultCallback) {
  await model.user
    .find({ email_id: userInput.email_id })

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
        //! NEED TO CHECK
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

module.exports = clientmanagement;

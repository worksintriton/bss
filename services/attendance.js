"use strict";

var _ = require("lodash"),
  db = require("../db"),
  async = require("async");

function attendance() {}

const model = require("../model/index");
attendance.MarkAttendancemob = async function (userInput, resultCallback) {
  await model.attendance
    .find({ employee_id: userInput.id, check: "Out", date: userInput.date })

    .then(async (data) => {
      console.log(data);
      if (data.length == 1) {
        var data = "You are already Singed-Out";
        resultCallback(null, data);
      } else {
        await model.attendance
          .find({
            employee_id: userInput.id,
            check: "In",
            date: userInput.date,
          })

          .then(async (data) => {
            if (data.length < 1) {
              await model.attendance
                .create({
                  employee_id: userInput.id,
                  check: "Out",
                  date: userInput.date,
                  Name: userInput.Name,
                  time: userInput.time,
                  check: "In",
                  status: "Present",
                })

                .then((data) => {
                  console.log(data);
                  resultCallback(null, data);
                })
                .catch((error) => {
                  resultCallback(error, null);
                  console.log("ERROR:", error);
                });
            } else {
              await model.attendance
                .findOneAndUpdate(
                  { employee_id: userInput.id, date: userInput.date },
                  { time: userInput.time, check: "Out" }
                )
                .then(async (data) => {
                  await model.attendance
                    .findOneAndUpdate(
                      {
                        employee_id: userInput.id,
                        check: "Out",
                        date: userInput.date,
                      },
                      { ...userInput }
                    )
                    //! need to check "work_duration"= "time_out" - "time_in"
                    // executor
                    //   .one(
                    //     'UPDATE public.attendance  SET  "work_duration"= "time_out" - "time_in" where "employee_id"=$1 and "check"=$2  and "date"=$3 RETURNING * ',
                    //     [, "Out", ]
                    //   )
                    .then((data) => {
                      resultCallback(null, data);
                    })
                    .catch((error) => {
                      resultCallback(error, null);
                      console.log("ERROR:", error);
                    });
                });
            }
          })
          .catch((error) => {
            resultCallback(error, null);
            console.log("ERROR:", error);
          });
      }
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

attendance.Weeklystatusweb = async function (userInput, resultCallback) {
  await model.attendance
    .find({
      date: {
        $gte: new Date(userInput.start_date),
        $lte: new Date(userInput.end_date),
      },
    })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

attendance.Weeklyreports = async function (userInput, resultCallback) {
  await model.employeedetails
    .find({
      date_joining: {
        $gte: new Date(userInput.start_date),
        $lte: new Date(userInput.end_date),
      },
    })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

attendance.Allstatusweb = async function (userInput, resultCallback) {
  await model.attendance
    .find({})
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

attendance.dailystatusweb = async function (userInput, resultCallback) {
  await model.attendance
    .find({ data: userInput.date })
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

attendance.dailyreports = async function (userInput, resultCallback) {
  await model.employeedetails
    .find({ date_joining: userInput.date })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

attendance.assigningemployees = async function (userInput, resultCallback) {
  await model.assignemployee
    .find({
      employee_id: userInput.employee_id,
      date: userInput.date,
    })

    .then(async (data) => {
      if (data.length == 1) {
        var data = "already assigned";
        resultCallback(null, data);
      } else {
        await model.assigneEmployee
          .create({
            client_id: userInput.client_id,
            client_name: userInput.client_name,
            employee_id: userInput.employee_id,
            employee_name: userInput.employee_name,
            date: userInput.date,
          })

          .then((data) => {
            console.log(data);
            var data = "assigned successfully";
            resultCallback(null, data);
          })
          .catch((error) => {
            resultCallback(error, null);
            console.log("ERROR:", error);
          });
      }
    })
    .catch((error) => {
      resultCallback(error, null);
      console.log("ERROR:", error);
    });
};

module.exports = attendance;

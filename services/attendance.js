"use strict";

var _ = require("lodash"),
  db = require("../db"),
  async = require("async");

function attendance() {}

const model = require("../model/index");
const Schema = require("mongoose");
const objectId = Schema.Types.ObjectId;
// attendance.MarkAttendancemob = async function (userInput, resultCallback) {
//   await model.attendance
//     .find({ employee_id: userInput.id, check: "Out", date: new Date(userInput.date) })

//     .then(async (data) => {
//       console.log(data);
//       if (data.length == 1) {
//         var data = "You are already Singed-Out";
//         resultCallback(null, data);
//       } else {
//         await model.attendance
//           .find({
//             employee_id: userInput.id,
//             check: "In",
//             date: new Date(userInput.date),
//           })

//           .then(async (data) => {
//             if (data.length < 1) {
//               await model.attendance
//                 .create({
//                   employee_id: userInput.id,
//                   check: "Out",
//                   date: new Date(userInput.date),
//                   Name: userInput.Name,
//                   time: userInput.time,
//                   status: "Present",
//                 })

//                 .then((data) => {
//                   console.log(data);
//                   resultCallback(null, data);
//                 })
//                 .catch((error) => {
//                   resultCallback(error, null);
//                   console.log("ERROR:", error);
//                 });
//             } else {
//               await model.attendance
//                 .findOneAndUpdate(
//                   { employee_id: userInput.id, date: userInput.date },
//                   { time: userInput.time, check: "Out" }
//                 )
//                 .then(async (data) => {
//                   await model.attendance
//                     .findOneAndUpdate(
//                       {
//                         employee_id: userInput.id,
//                         check: "Out",
//                         date: userInput.date,
//                       },
//                       { ...userInput }
//                     )
//                     //! need to check "work_duration"= "time_out" - "time_in"
//                     // executor
//                     //   .one(
//                     //     'UPDATE public.attendance  SET  "work_duration"= "time_out" - "time_in" where "employee_id"=$1 and "check"=$2  and "date"=$3 RETURNING * ',
//                     //     [userInput.id, "Out", userInput.date]
//                     //   )
//                     .then((data) => {
//                       resultCallback(null, data);
//                     })
//                     .catch((error) => {
//                       resultCallback(error, null);
//                       console.log("ERROR:", error);
//                     });
//                 });
//             }
//           })
//           .catch((error) => {
//             resultCallback(error, null);
//             console.log("ERROR:", error);
//           });
//       }
//     })
//     .catch((error) => {
//       resultCallback(error, null);
//       console.log("ERROR:", error);
//     });
// };

attendance.MarkAttendancemob = async function (userInput, resultCallback) {
  await model.attendance
    .create({
      employee_id: userInput.employee_id,
      date: userInput.date,
      check: userInput.check,
      time: userInput.time,
      site_id: userInput.site_id,
      status: "Present",
    })
    .then((data) => {
      resultCallback(null, data);
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
  const record = [];

  const getEmployeeIds = await model.attendance.aggregate([
    {
      $match: {
        site_id: new objectId(userInput.site_id),
      },
    },
    {
      $match: {
        date: new Date(userInput.date),
      },
    },
    {
      $group: {
        _id: "$employee_id",
      },
    },
  ]);
  for (const iterator of getEmployeeIds) {
    const data = await model.attendance.find({
      employee_id: iterator._id,
    });

    record.push(data[0]);
    if (data.length > 1) {
      record.push(data[data.length - 1]);
    }
  }
  const responseData = [];

  function groupByEmployeeId(records) {
    const groupedRecords = {};

    records.forEach((record) => {
      const { employee_id, time, check } = record;
      if (!groupedRecords[employee_id]) {
        groupedRecords[employee_id] = [{ [check]: time }];
      } else {
        groupedRecords[employee_id][0][check] = time;
      }
    });

    return groupedRecords;
  }
  const groupedByEmployeeId = groupByEmployeeId(record);

  resultCallback(null, groupedByEmployeeId);
};

attendance.History = async function (userInput, resultCallback) {
  const data = await model.attendance.find(
    {
      employee_id: userInput.employee_id,
      date: userInput.date,
      site_id: new objectId(userInput.site_id),
    },
    { time: 1, date: 1, check: 1, employee_id: 1 }
  );

  resultCallback(null, data);
};

attendance.dailystatusweb = async function (userInput, resultCallback) {
  await model.attendance
    .find(
      { employee_id: userInput.employee_id },
      {},
      { sort: { createdAt: -1 } }
    )
    .limit(1)
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

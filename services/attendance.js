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
      name: userInput.name,
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

attendance.Weeklystatusweb = async function (userInput, query, resultCallback) {
  const { searchKey, skip, limit, sortkey, sortOrder } = query;

  const sort = { [sortkey]: !sortOrder || sortOrder === "DESC" ? -1 : 1 };

  const searchRegex = new RegExp(["^.*", searchKey, ".*$"].join(""), "i");

  const data = await model.attendance.aggregate([
    {
      $match: userInput.start_date
        ? {
            date: {
              $gte: new Date(userInput.start_date),
              $lte: new Date(userInput.end_date),
            },
          }
        : {},
    },

    {
      $match: searchKey
        ? {
            $or: [{}],
          }
        : {},
    },

    {
      $sort: sort,
    },
    {
      $facet: {
        pagination: [{ $count: "totalCount" }],
        data: [{ $skip: Number(skip) || 0 }, { $limit: Number(limit) || 10 }],
      },
    },
  ]);

  resultCallback(null, data);
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
      date: new Date(userInput.date),
    });

    record.push(data[0]);
    if (data.length > 1 && data[data.length - 1].check !== "In") {
      record.push(data[data.length - 1]);
    }
  }
  const responseData = [];

  function groupByEmployeeId(records) {
    const groupedRecords = {};

    records.forEach((record) => {
      const { employee_id, time, check, name } = record;
      if (!groupedRecords[employee_id]) {
        groupedRecords[employee_id] = [{ [check]: time, ["name"]: name }];
      } else {
        groupedRecords[employee_id][0][check] = time;
        groupedRecords[employee_id][0]["name"] = name;
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

attendance.getcheckinlist = async function (userInput, resultCallback) {
  try {
    const checkInData = [];
    const checkOutData = [];
    const data = [];
    const empId = await model.usermanage.find({}, { Empolyee_id: 1 });

    for (const el of empId) {
      const attendanceLastRecord = await model.attendance
        .find({ employee_id: el.Empolyee_id }, {}, { sort: { createdAt: -1 } })
        .limit(1);
      if (attendanceLastRecord.length) {
        data.push(attendanceLastRecord[0]["_doc"]);
      } else {
        checkOutData.push(el);
      }
    }
    for (const iterator of data) {
      if (iterator.check === "In") {
        checkInData.push(iterator);
      } else {
        checkOutData.push(iterator);
      }
    }
    resultCallback(null, { checkInData, checkOutData });
  } catch (error) {
    resultCallback(error, null);
    console.log("ERROR:", error);
  }
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

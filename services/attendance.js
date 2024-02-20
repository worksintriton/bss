"use strict";

var _ = require("lodash"),
  db = require("../db"),
  async = require("async");
const moment = require("moment");

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
      lat: userInput.lat,
      lon: userInput.lon,
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
  const currentDate = moment();

  const record = [];

  const { searchKey, skip, limit, sortkey, sortOrder } = query;

  const sort = { [sortkey]: !sortOrder || sortOrder === "DESC" ? -1 : 1 };

  const searchRegex = new RegExp(["^.*", searchKey, ".*$"].join(""), "i");
  // const getEmployeeIds = await model.usermanage.aggregate([
  //   {
  //     $match: userInput.site_id
  //       ? {
  //           site_id: new objectId(userInput.site_id),
  //         }
  //       : {},
  //   },
  //   {
  //     $match: userInput.date
  //       ? {
  //           date: new Date(userInput.date),
  //         }
  //       : {},
  //   },
  //   {
  //     $group: {
  //       _id: "$employee_id",
  //       name: {
  //         $first: "$name",
  //       },
  //     },
  //   },
  // ]);

  const getEmployeeIds = await model.usermanage.find(
    {},
    { Empolyee_id: 1, Name: 1 }
  );

  const userAttendance = [];

  const attendanceRecords = [];

  let filter;

  if (userInput.start_date && userInput.end_date) {
    filter = {
      $match: {
        date: {
          $gte: new Date(userInput.start_date),
          $lte: new Date(userInput.end_date),
        },
      },
    };
  } else if (userInput.date) {
    filter = {
      $match: {
        date: new Date(userInput.date),
      },
    };
  } else {
    filter = {
      $match: {
        date: new Date(currentDate.format("YYYY-MM-DD")),
      },
    };
  }

  for (const iterator of getEmployeeIds) {
    const getAttendanceList = await model.attendance.aggregate([
      {
        $match: {
          employee_id: iterator.Empolyee_id,
        },
      },
      {
        ...filter,
      },
    ]);

    //group records based on date

    const groupedRecords = getAttendanceList.reduce((acc, rec) => {
      const date = String(rec.date.toISOString()).split("T")[0]; // Extracting date without time
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(rec);
      return acc;
    }, {});

    //iterate object
    for (const key in groupedRecords) {
      userAttendance.push({
        emp_name: groupedRecords[key].at(0).name,
        status: groupedRecords[key].at(0).status,
        checkIn: groupedRecords[key].at(0).time,
        checkInlat: groupedRecords[key].at(0).lat,
        checkInlon: groupedRecords[key].at(0).lon,
        emp_id: groupedRecords[key].at(0).employee_id,
        checkOut: groupedRecords[key].at(-1).time,
        checkOutlat: groupedRecords[key].at(-1).lat,
        checkOutlon: groupedRecords[key].at(-1).lon,
        date: groupedRecords[key].at(0).date,
      });
    }
    // if (getAttendanceList.length) {
    //   userAttendance.push({
    // emp_name: getAttendanceList[0].name,
    // status: getAttendanceList[0].status,
    // checkIn: getAttendanceList[0].time,
    // checkOut: getAttendanceList.at(-1).time,
    // date: getAttendanceList[0].date,
    //   });
    // } else {
    //   attendanceRecords.push({
    //     emp_name: iterator.name,
    //     status: "-",
    //     checkIn: "-",
    //     checkOut: "-",
    //   });
    // }
  }
  // userAttendance.push({
  //   emp_name: attendanceRecords[0].name,
  //   status: attendanceRecords[0].status,
  //   checkIn: attendanceRecords[0].time,
  //   checkOut: attendanceRecords.at(-1).time,
  //   date: attendanceRecords[0].date,
  // });

  resultCallback(null, userAttendance);
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
    const empId = await model.mapusers.find(
      { Map_id: new objectId(userInput.site_id) },
      { Emp_id: 1, Employee_name: 1 }
    );

    for (const el of empId) {
      const attendanceLastRecord = await model.attendance
        .find({ employee_id: el.Emp_id }, {}, { sort: { createdAt: -1 } })
        .limit(1);
      if (attendanceLastRecord.length) {
        data.push(attendanceLastRecord[0]["_doc"]);
      } else {
        const userName = await model.usermanage.findOne(
          { Empolyee_id: el.Emp_id },
          { Name: 1 }
        );
        el.name = userName.Name;
        checkOutData.push(el);
      }
    }
    for (const iterator of data) {
      if (iterator.check !== "In") {
        checkInData.push(iterator);
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

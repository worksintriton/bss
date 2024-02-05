"use strict";

var _ = require("lodash"),
  db = require("../db"),
  async = require("async");
const model = require("../model/index");
function point_tracking() {}

point_tracking.PointTrackMaps = async function (userInput, resultCallback) {
  await model.pointtrackmap
    .create({
      title: userInput.title,
      description: userInput.description,
      totaltime: userInput.totaltime,
      totalmeters: userInput.totalmeters,
      startlat: userInput.startlat,
      startlon: userInput.startlon,
      endlat: userInput.endlat,
      endlon: userInput.endlon,
      isactive: userInput.isactive,
      createdby: userInput.createdby,
      createdtime: userInput.createdtime,
      updatedby: userInput.updatedby,
      updatedtime: userInput.updatedtime,
    })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};
point_tracking.updatePointTrackMapmobile = async function (
  userInput,
  resultCallback
) {
  await model.pointtrackmap
    .updateOne({ _id: userInput.ukey }, { ...userInput })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.DeletePointTrackMapmobile = async function (
  userInput,
  resultCallback
) {
  await model.pointtrackmap
    .deleteOne({ _id: userInput.ukey })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.PointTrackMaplistmobile = async function (
  userInput,
  resultCallback
) {
  await model.pointtrackmap
    .find({})

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

// records //

point_tracking.PointTrackMapRecordsmobile = async function (
  userInput,
  resultCallback
) {
  await model.pointtrackrecords
    .create({
      title: userInput.title,
      description: userInput.description,
      createdby: userInput.createdby,
      createdtime: userInput.createdtime,
      updatedby: userInput.updatedby,
      updatedtime: userInput.updatedtime,
      totaltime: userInput.totaltime,
      totalmeters: userInput.totalmeters,
      PointTrackMaprefid: userInput.PointTrackMaprefid,
      startlat: userInput.startlat,
      startlon: userInput.startlon,
      endlat: userInput.endlat,
      endlon: userInput.endlon,
      isactive: userInput.isactive,
      starttime: userInput.starttime,
      endtime: userInput.endtime,
    })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};
point_tracking.updatePointTrackMapRecordsmobile = async function (
  userInput,
  resultCallback
) {
  await model.pointtrackrecords
    .updateOne({ _id: userInput.ukey }, { ...userInput })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.DeletePointTrackMapRecordsmobile = async function (
  userInput,
  resultCallback
) {
  await model.pointtrackrecords
    .deleteOne({ PointTrackMaprefid: userInput.PointTrackMaprefid })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.PointTrackMapRecordslistmobile = async function (
  userInput,
  resultCallback
) {
  await model.pointtrackrecords
    .findOne({ PointTrackMaprefid: userInput.PointTrackMaprefid })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.PointTrackMapSpots = async function (userInput, resultCallback) {
  await model.pointtrackmapspot
    .create({
      position: userInput.position,
      PointTrackMaprefid: userInput.PointTrackMaprefid,
      title: userInput.title,
      description: userInput.description,
      lat: userInput.lat,
      lon: userInput.lon,
      accepteddistinmeter: userInput.accepteddistinmeter,
      isactive: userInput.isactive,
      createdby: userInput.createdby,
      createdtime: userInput.createdtime,
      updatedby: userInput.updatedby,
      updatedtime: userInput.updatedtime,
      marked_time: userInput.marked_time,
      marked_lat: userInput.marked_lat,
      marked_lon: userInput.marked_lon,
      marked_by: userInput.marked_by,
      is_marked: userInput.is_marked,
    })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.updatePointTrackMapSpotmobile = async function (
  userInput,
  resultCallback
) {
  await model.pointtrackmapspot
    .updateOne({ _id: userInput.id }, { ...userInput })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.DeletePointTrackMapSpotmobile = async function (
  userInput,
  resultCallback
) {
  await model.pointtrackmapspot
    .deleteOne({ pointtrackmapid: userInput.pointtrackmapid })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.PointTrackMapSpotlistmobile = async function (
  userInput,
  resultCallback
) {
  await model.pointtrackmapspot
    .find({ PointTrackMaprefid: userInput.PointTrackMaprefid })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.FetchMapSpotmobile = async function (userInput, resultCallback) {
  await model.pointtrackmapspot
    .find({ _id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.Addpointsweb = async function (userInput, resultCallback) {
  await model.pointtrackmap
    .create({
      Emp_id: userInput.Emp_id,
      site_id:userInput.site_id,
      site_name:userInput.site_name,
      Employee_Name: userInput.Employee_Name,
      createdtime: userInput.createdtime,
      description: userInput.description,
      title: userInput.title,
      updatedtime: userInput.updatedtime,
      notification_title: "create map",
    })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.pointsupdateweb = async function (userInput, resultCallback) {
  await model.pointtrackmap
    .updateOne({ _id: userInput.ukey }, { ...userInput })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.pointslistweb = async function (userInput, resultCallback) {
  await model.pointtrackmap
    .find({ Employee_id: userInput.Employee_id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.deletepointsweb = async function (userInput, resultCallback) {
  await model.pointtrackmap
    .deleteOne({ _id: userInput.ukey })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.fetchpointsweb = async function (userInput, resultCallback) {
  await model.pointtrackmap
    .find({ _id: userInput.ukey })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.employee_fetchpointsmobile = async function (
  userInput,
  resultCallback
) {
  await model.pointtrackmap
    .find({ Emp_id: userInput.Emp_id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.fetchemployeess = async function (userInput, resultCallback) {
  await model.employeedetails
    .aggregate([
      {
        $lookup: {
          from: "employee_track",
          localField: "_id",
          foreignField: "Employee_id",
          as: "data",
        },
      },
      {
        $unwind: {
          path: "$data",
          preserveNullAndEmptyArrays: true,
        },
      },
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.deleteEmployeeTrackings = async function (
  userInput,
  resultCallback
) {
  await model.employeedetails
    .deleteOne({ _id: userInput.id })
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.fetchTrackinglists = async function (userInput, resultCallback) {
  await model.employeetrack
    .find({ Employee_id: userInput.Employee_id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

/*adshfjkhas*/
point_tracking.PointTrackRecordsSpotmobile = async function (
  userInput,
  resultCallback
) {
  await model.pointtrackrecordsspot
    .create({
      PointTrackRecordsid: userInput.PointTrackRecordsid,
      position: userInput.position,
      title: userInput.title,
      description: userInput.description,
      lat: userInput.lat,
      lon: userInput.lon,
      accepteddistinmeter: userInput.accepteddistinmeter,
      isactive: userInput.isactive,
      createdby: userInput.createdby,
      createdtime: userInput.createdtime,
      updatedby: userInput.updatedby,
      updatedtime: userInput.updatedtime,
      marked_time: userInput.marked_time,
      marked_lat: userInput.marked_lat,
      marked_lon: userInput.marked_lon,
      marked_by: userInput.marked_by,
      is_marked: userInput.is_marked,
    })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.updatePointTrackRecordsSpotmobile = async function (
  userInput,
  resultCallback
) {
  await model.pointtrackrecordsspot
    .updateOne({ _id: userInput.id }, { ...userInput })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.DeletePointTrackRecordsSpotmobile = async function (
  userInput,
  resultCallback
) {
  await model.pointtrackrecordsspot
    .deleteOne({ _id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.PointTrackRecordsSpotlistmobile = async function (
  userInput,
  resultCallback
) {
  await model.pointtrackrecordsspot
    .find({ PointTrackRecordsid: userInput.PointTrackRecordsid })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.FetchMapSpotrecordmobile = async function (
  userInput,
  resultCallback
) {
  await model.pointtrackrecordsspot
    .find({ _id: userInput.id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.addmapuseweb = async function (userInput, resultCallback) {
  await model.mapusers
    .create({
      Emp_id: userInput.Emp_id,
      Employee_name: userInput.Employee_name,
      Map_id: userInput.Map_id,
      gender: userInput.gender,
      contact_no: userInput.contact_no,
      Email_id: userInput.Email_id,
      Client_place: userInput.Client_place,
      Address: userInput.Address,
      status: "Open",
      notification_title: "create map",
    })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.addmapuserlistweb = async function (
  userInput,
  payload,
  resultCallback
) {
  const { searchKey, skip, limit, sortkey, sortOrder, Map_id } = payload;

  const sort = { [sortkey]: !sortOrder || sortOrder === "DESC" ? -1 : 1 };

  const searchRegex = new RegExp(["^.*", searchKey, ".*$"].join(""), "i");

  await model.mapusers
    .aggregate([
      {
        $match: Map_id
          ? {
              Map_id: Map_id,
            }
          : {},
      },
      {
        $match: searchKey
          ? {
              $or: [{ Employee_name: searchRegex }],
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
    ])

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.mapuserdeleteweb = async function (userInput, resultCallback) {
  await model.mapusers
    .deleteOne({ Emp_id: userInput.Emp_id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.fetchmapuserpointsweb1 = async function (
  userInput,
  resultCallback
) {
  await model.pointtrackmap
    .find({ Emp_id: userInput.Emp_id })

    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.fetchmapuserpointsweb2 = async function (
  userInput,
  resultCallback
) {
  await model.pointtrackmap
    .aggregate([
      {
        $lookup: {
          from: "map_users",
          localField: "_id",
          foreignField: "Map_id",
          as: "point_track",
        },
      },
      {
        $unwind: {
          path: "$point_track",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          Emp_id: userInput.Emp_id,
        },
      },
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

module.exports = point_tracking;

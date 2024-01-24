"use strict";

var _ = require("lodash"),
  db = require("../db"),
  async = require("async");

function point_tracking() {}

point_tracking.PointTrackMaps = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor
    .one(
      'INSERT INTO public."PointTrackMap"("title","description","totaltime","totalmeters","startlat","startlon","endlat","endlon","isactive","createdby","createdtime","updatedby","updatedtime")VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)RETURNING *',
      [
        userInput.title,
        userInput.description,
        userInput.totaltime,
        userInput.totalmeters,
        userInput.startlat,
        userInput.startlon,
        userInput.endlat,
        userInput.endlon,
        userInput.isactive,
        userInput.createdby,
        userInput.createdtime,
        userInput.updatedby,
        userInput.updatedtime,
      ]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};
point_tracking.updatePointTrackMapmobile = function (
  userInput,
  resultCallback
) {
  var executor = db.getdaata.getdb();
  executor
    .any(
      'UPDATE public."PointTrackMap" SET title=($2), description=($3), totaltime=($4), totalmeters=($5), createdby=($6), createdtime=($7), updatedby=($8), updatedtime=($9), "Emp_id"=($10), "Employee_Name"=($11), status=($12), notification_title = ($13) , startlat = ($14), startlon = ($15), endlat = ($16), endlon = ($17) , isactive = ($18)  WHERE  ukey=($1) RETURNING *',
      [
        userInput.ukey,
        userInput.title,
        userInput.description,
        userInput.totaltime,
        userInput.totalmeters,
        userInput.createdby,
        userInput.createdtime,
        userInput.updatedby,
        userInput.updatedtime,
        userInput.Emp_id,
        userInput.Employee_Name,
        userInput.status,
        userInput.notification_title,
        userInput.startlat,
        userInput.startlon,
        userInput.endlat,
        userInput.endlon,
        userInput.isactive,
      ]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.DeletePointTrackMapmobile = function (
  userInput,
  resultCallback
) {
  var executor = db.getdaata.getdb();
  executor
    .any('Delete from public."PointTrackMap" where "ukey"=($1)', [
      userInput.ukey,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.PointTrackMaplistmobile = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor
    .any('select * from public."PointTrackMap" ', [userInput.ukey])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

// records //

point_tracking.PointTrackMapRecordsmobile = function (
  userInput,
  resultCallback
) {
  var executor = db.getdaata.getdb();

  executor
    .one(
      'INSERT INTO public."PointTrackRecords"( "title", "description", "createdby", "createdtime", "updatedby", "updatedtime", "totaltime", "totalmeters", "PointTrackMaprefid", "startlat", "startlon", "endlat", "endlon", "isactive", "starttime", "endtime") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING * ',
      [
        userInput.title,
        userInput.description,
        userInput.createdby,
        userInput.createdtime,
        userInput.updatedby,
        userInput.updatedtime,
        userInput.totaltime,
        userInput.totalmeters,
        userInput.PointTrackMaprefid,
        userInput.startlat,
        userInput.startlon,
        userInput.endlat,
        userInput.endlon,
        userInput.isactive,
        userInput.starttime,
        userInput.endtime,
      ]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};
point_tracking.updatePointTrackMapRecordsmobile = function (
  userInput,
  resultCallback
) {
  var executor = db.getdaata.getdb();
  executor
    .any(
      'UPDATE public."PointTrackRecords" SET  "title"=($2), description=($3), totaltime=($4), totalmeters=($5), startlat=($6), startlon=($7), endlat=($8), endlon=($9), isactive=($10), createdby=($11), createdtime=($12), updatedby=($13), updatedtime=($14), "PointTrackMaprefid"=($15), starttime=($16), endtime=($17) WHERE "ukey"= ($1) RETURNING *',
      [
        userInput.ukey,
        userInput.title,
        userInput.description,
        userInput.totaltime,
        userInput.totalmeters,
        userInput.startlat,
        userInput.startlon,
        userInput.endlat,
        userInput.endlon,
        userInput.isactive,
        userInput.createdby,
        userInput.createdtime,
        userInput.updatedby,
        userInput.updatedtime,
        userInput.PointTrackMaprefid,
        userInput.starttime,
        userInput.endtime,
      ]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.DeletePointTrackMapRecordsmobile = function (
  userInput,
  resultCallback
) {
  var executor = db.getdaata.getdb();
  executor
    .any(
      'Delete from public."PointTrackRecords" where "PointTrackMaprefid"=($1)',
      [userInput.PointTrackMaprefid]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.PointTrackMapRecordslistmobile = function (
  userInput,
  resultCallback
) {
  var executor = db.getdaata.getdb();
  executor
    .any(
      'select * from public."PointTrackRecords" where "PointTrackMaprefid"=($1) ',
      [userInput.PointTrackMaprefid]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.PointTrackMapSpots = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor
    .one(
      'INSERT INTO public."PointTrackMapSpots"("position","PointTrackMaprefid","title","description","lat","lon","accepteddistinmeter","isactive","createdby","createdtime","updatedby","updatedtime","marked_time","marked_lat","marked_lon","marked_by","is_marked")VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)RETURNING *',
      [
        userInput.position,
        userInput.PointTrackMaprefid,
        userInput.title,
        userInput.description,
        userInput.lat,
        userInput.lon,
        userInput.accepteddistinmeter,
        userInput.isactive,
        userInput.createdby,
        userInput.createdtime,
        userInput.updatedby,
        userInput.updatedtime,
        userInput.marked_time,
        userInput.marked_lat,
        userInput.marked_lon,
        userInput.marked_by,
        userInput.is_marked,
      ]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.updatePointTrackMapSpotmobile = function (
  userInput,
  resultCallback
) {
  var executor = db.getdaata.getdb();
  executor
    .one(
      ' UPDATE public."PointTrackMapSpots" SET "position"=($2) , title=($3) , description=($4) , lat=($5) , lon=($6) , accepteddistinmeter=($7) , isactive=($8) , createdby=($9) , createdtime=($10) , updatedby=($11) , updatedtime=($12) , marked_time=($13) , marked_lat=($14) , marked_lon=($15) , marked_by=($16) , is_marked=($17) , "PointTrackMaprefid" = ($18)   WHERE id =($1) RETURNING * ',
      [
        userInput.id,
        userInput.position,
        userInput.title,
        userInput.description,
        userInput.lat,
        userInput.lon,
        userInput.accepteddistinmeter,
        userInput.isactive,
        userInput.createdby,
        userInput.createdtime,
        userInput.updatedby,
        userInput.updatedtime,
        userInput.marked_time,
        userInput.marked_lat,
        userInput.marked_lon,
        userInput.marked_by,
        userInput.is_marked,
        userInput.PointTrackMaprefid,
      ]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.DeletePointTrackMapSpotmobile = function (
  userInput,
  resultCallback
) {
  var executor = db.getdaata.getdb();
  executor
    .any('Delete from public."PointTrackMapSpots" where "id"=($1)', [
      userInput.pointtrackmapid,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.PointTrackMapSpotlistmobile = function (
  userInput,
  resultCallback
) {
  var executor = db.getdaata.getdb();
  executor
    .any(
      'select * from public."PointTrackMapSpots" where "PointTrackMaprefid"=($1) ',
      [userInput.PointTrackMaprefid]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.FetchMapSpotmobile = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor
    .any('select * from public."PointTrackMapSpots" where "id"=($1) ', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.Addpointsweb = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor
    .one(
      'INSERT INTO public."PointTrackMap"("Emp_id","Employee_Name","createdtime","description","title","updatedtime","status","notification_title")VALUES($1,$2,$3,$4,$5,$6,$7,$8)RETURNING *',
      [
        userInput.Emp_id,
        userInput.Employee_Name,
        userInput.createdtime,
        userInput.description,
        userInput.title,
        userInput.updatedtime,
        userInput.status,
        "create map",
      ]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.pointsupdateweb = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor
    .any(
      ' update public."PointTrackMap"  set   "Employee_Name" = ($2) , "description"= ($3),"title" = ($4),"updatedtime" = ($5),"status" = ($6) where  "ukey" = ($1) RETURNING *',
      [
        userInput.ukey,
        userInput.Employee_Name,
        userInput.description,
        userInput.title,
        userInput.updatedtime,
        userInput.status,
      ]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.pointslistweb = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor
    .any('select * from public."PointTrackMap"', [userInput.Employee_id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.deletepointsweb = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor
    .any('Delete FROM public."PointTrackMap" WHERE "ukey"=($1)', [
      userInput.ukey,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.fetchpointsweb = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor
    .any('select * from public."PointTrackMap" where "ukey"=($1)', [
      userInput.ukey,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.employee_fetchpointsmobile = function (
  userInput,
  resultCallback
) {
  var executor = db.getdaata.getdb();
  executor
    .any('select * from public."PointTrackMap" where "Emp_id"=($1)', [
      userInput.Emp_id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.fetchemployeess = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor
    .any(
      'select * from public."employeedetails" where id in (select cast("Employee_id" as integer)from public."employee_track")',
      []
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.deleteEmployeeTrackings = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor
    .any('DELETE FROM public.employeedetails WHERE "id"=($1)', [userInput.id])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.fetchTrackinglists = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor
    .any(
      'select * from public."employee_track" where "Employee_id"=($1) ORDER BY "updated_at" ASC',
      [userInput.Employee_id]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

/*adshfjkhas*/
point_tracking.PointTrackRecordsSpotmobile = function (
  userInput,
  resultCallback
) {
  var executor = db.getdaata.getdb();
  executor
    .one(
      'INSERT INTO public."pointtrackrecordsspots"("PointTrackRecordsid","position","title","description","lat","lon","accepteddistinmeter","isactive","createdby","createdtime","updatedby","updatedtime","marked_time","marked_lat","marked_lon","marked_by","is_marked")VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)RETURNING *',
      [
        userInput.PointTrackRecordsid,
        userInput.position,
        userInput.title,
        userInput.description,
        userInput.lat,
        userInput.lon,
        userInput.accepteddistinmeter,
        userInput.isactive,
        userInput.createdby,
        userInput.createdtime,
        userInput.updatedby,
        userInput.updatedtime,
        userInput.marked_time,
        userInput.marked_lat,
        userInput.marked_lon,
        userInput.marked_by,
        userInput.is_marked,
      ]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.updatePointTrackRecordsSpotmobile = function (
  userInput,
  resultCallback
) {
  var executor = db.getdaata.getdb();
  executor
    .one(
      ' UPDATE public."pointtrackrecordsspots" SET "position"=($2) , title=($3) , description=($4) , lat=($5) , lon=($6) , accepteddistinmeter=($7) , isactive=($8) , createdby=($9) , createdtime=($10) , updatedby=($11) , updatedtime=($12) , marked_time=($13) , marked_lat=($14) , marked_lon=($15) , marked_by=($16) , is_marked=($17) , "PointTrackRecordsid"=($18)  WHERE id=($1) RETURNING * ',
      [
        userInput.id,
        userInput.position,
        userInput.title,
        userInput.description,
        userInput.lat,
        userInput.lon,
        userInput.accepteddistinmeter,
        userInput.isactive,
        userInput.createdby,
        userInput.createdtime,
        userInput.updatedby,
        userInput.updatedtime,
        userInput.marked_time,
        userInput.marked_lat,
        userInput.marked_lon,
        userInput.marked_by,
        userInput.is_marked,
        userInput.PointTrackRecordsid,
      ]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.DeletePointTrackRecordsSpotmobile = function (
  userInput,
  resultCallback
) {
  var executor = db.getdaata.getdb();
  executor
    .any('Delete from public."pointtrackrecordsspots" where "id"=($1)', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.PointTrackRecordsSpotlistmobile = function (
  userInput,
  resultCallback
) {
  var executor = db.getdaata.getdb();
  executor
    .any(
      'select * from public."pointtrackrecordsspots" where "PointTrackRecordsid" = ($1)',
      [userInput.PointTrackRecordsid]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.FetchMapSpotrecordmobile = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor
    .any('select * from public."pointtrackrecordsspots" where "id" = ($1)', [
      userInput.id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.addmapuseweb = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor
    .one(
      'INSERT INTO public."Mapusers"("Emp_id","Employee_name","Map_id","gender","contact_no","Email_id","Client_place","Address","title","status","notification_title")VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)RETURNING *',
      [
        userInput.Emp_id,
        userInput.Employee_name,
        userInput.Map_id,
        userInput.gender,
        userInput.contact_no,
        userInput.Email_id,
        userInput.Client_place,
        userInput.Address,
        userInput.Client_place,
        "Open",
        "create map",
      ]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.addmapuserlistweb = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor
    .any('select * from public."Mapusers" WHERE "Map_id"=($1)', [
      userInput.Map_id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.mapuserdeleteweb = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor
    .any('Delete from public."Mapusers" WHERE "Emp_id"=($1) ', [
      userInput.Emp_id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.fetchmapuserpointsweb1 = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor
    .any('Select * from public."PointTrackMap" WHERE "Emp_id"=($1) ', [
      userInput.Emp_id,
    ])
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

point_tracking.fetchmapuserpointsweb2 = function (userInput, resultCallback) {
  // var executor = db.getdaata.getdb();
  // executor.any('Select * from public."Mapusers" WHERE "Emp_id"=($1) ',[userInput.Emp_id])
  //                .then(data => {
  //                   resultCallback(null,data);
  //                })
  //                .catch(error => {
  //                   resultCallback(null,error );
  //               })
  var executor = db.getdaata.getdb();
  executor
    .any(
      'Select * from public."PointTrackMap" WHERE ukey in (Select CAST ("Map_id"  AS INTEGER) from public."Mapusers" WHERE "Emp_id"=($1)) ',
      [userInput.Emp_id]
    )
    .then((data) => {
      resultCallback(null, data);
    })
    .catch((error) => {
      resultCallback(null, error);
    });
};

module.exports = point_tracking;


"use strict";

var _ = require("lodash"),
        db = require("../db"),
        async = require("async");

function point_tracking() {}


point_tracking.PointTrackMaps = function (userInput, resultCallback) {

  var executor = db.getdaata.getdb();
  executor.one('INSERT INTO public."PointTrackMap"("title","description","totaltime","totalmeters","startlat","startlon","endlat","endlon","isactive","createdby","createdtime","updatedby","updatedtime")VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)RETURNING *',
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
                 ])
                 .then(data => {
                    resultCallback(null,data);
                 })
                 .catch(error => {
                    resultCallback(null,error );
                })
};




point_tracking.updatePointTrackMapmobile = function (userInput, resultCallback) {

  var executor = db.getdaata.getdb();
  executor.any('UPDATE public."PointTrackMap" SET title=($2), description=($3), totaltime=($4), totalmeters=($5), startlat=($6), startlon=($7), endlat=($8), endlon=($9), isactive=($10), createdby=($11), createdtime=($12), updatedby=($13), updatedtime=($14) WHERE  ukey=($1) RETURNING *',
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
                 ])
                 .then(data => {
                    resultCallback(null,data);
                 })
                 .catch(error => {
                    resultCallback(null,error );
                })
};


point_tracking.PointTrackMapSpots = function (userInput, resultCallback) {

  var executor = db.getdaata.getdb();
  executor.one('INSERT INTO public."PointTrackMapSpots"("position","title","description","lat","lon","accepteddistinmeter","isactive","createdby","createdtime","updatedby","updatedtime","marked_time","marked_lat","marked_lon","marked_by","is_marked")VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)RETURNING *',
                 [ 
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
                 userInput.is_marked
                 ])
                 .then(data => {
                    resultCallback(null,data);
                 })
                 .catch(error => {
                    resultCallback(null,error );
                })
};


point_tracking.Addpointsweb = function (userInput, resultCallback) {

  var executor = db.getdaata.getdb();
  executor.one('INSERT INTO public."Maptrackpoint"("Emp_id","Employee_id","created_date","mapdescription","maptitle","updated_date","status","create_map")VALUES($1,$2,$3,$4,$5,$6,$7,$8)RETURNING *',
                 [ 
                 userInput.Emp_id,
                 userInput.Employee_id,
                 userInput.created_date,
                 userInput.mapdescription,
                 userInput.maptitle,
                 userInput.updated_date,
                 userInput.status,
                 "create map"
                 ])
                 .then(data => {
                    resultCallback(null,data);
                 })
                 .catch(error => {
                    resultCallback(null,error );
                })
};


point_tracking.pointsupdateweb = function (userInput, resultCallback) {

  var executor = db.getdaata.getdb();
  executor.one(' update public."Maptrackpoint"  set   "Employee_id" = ($2) , "mapdescription"= ($3),"maptitle" = ($4),"updated_date" = ($5),"status" = ($6) where  "mappoint_id" = ($1) RETURNING *',
                 [ 
                 userInput.mappoint_id,
                 userInput.Employee_id,
                 userInput.mapdescription,
                 userInput.maptitle,
                 userInput.updated_date,
                 userInput.status
                 ])
                 .then(data => {
                    resultCallback(null,data);
                 })
                 .catch(error => {
                    resultCallback(null,error );
                })
};


point_tracking.pointslistweb = function (userInput, resultCallback) {

  var executor = db.getdaata.getdb();
  executor.any('select * from public."Maptrackpoint"',
                 [
                 userInput.Employee_id
                 ])
                 .then(data => {
                    resultCallback(null,data);
                 })
                 .catch(error => {
                    resultCallback(null,error );
                })
};

point_tracking.deletepointsweb = function (userInput, resultCallback) {

  var executor = db.getdaata.getdb();
  executor.any('Delete FROM public."Maptrackpoint" WHERE "mappoint_id"=($1)',
                 [
                 userInput.mappoint_id
                 ])
                 .then(data => {
                    resultCallback(null,data);
                 })
                 .catch(error => {
                    resultCallback(null,error );
                })
};

point_tracking.fetchpointsweb = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor.any('select * from public."Maptrackpoint" where "mappoint_id"=($1)',
                 [
                 userInput.mappoint_id
                 ])
                 .then(data => {
                    resultCallback(null,data);
                 })
                 .catch(error => {
                    resultCallback(null,error );
                })
};


point_tracking.employee_fetchpointsmobile = function (userInput, resultCallback) {
  var executor = db.getdaata.getdb();
  executor.any('select * from public."Maptrackpoint" where "Emp_id"=($1)',
                 [
                 userInput.Emp_id
                 ])
                 .then(data => {
                    resultCallback(null,data);
                 })
                 .catch(error => {
                    resultCallback(null,error );
                })
};





module.exports = point_tracking;

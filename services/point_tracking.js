
"use strict";

var _ = require("lodash"),
        db = require("../db"),
        async = require("async");

function point_tracking() {}


point_tracking.PointTrackMaps = function (userInput, resultCallback) {

  var executor = db.getdaata.getdb();
  executor.one('INSERT INTO public."PointTrackMap"("mapspots_id","title","description","totaltime","totalmeters","startlat","startlon","endlat","endlon","isactive","createdby","createdtime","updatedby","updatedtime")VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)RETURNING *',
                 [ 
                 userInput.mapspots_id,
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




point_tracking.PointTrackMaps = function (userInput, resultCallback) {

  var executor = db.getdaata.getdb();

   

  executor.one('UPDATE public."PointTrackMap" SET title=?, description=?, totaltime=?, totalmeters=?, startlat=?, startlon=?, endlat=?, endlon=?, isactive=?, createdby=?, createdtime=?, updatedby=?, updatedtime=?, mapspots_id=? WHERE  ukey=?',
                 [ 
                 userInput.mapspots_id,
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
  executor.one('INSERT INTO public."Maptrackpoint"("Emp_id","Employee_id","created_date","mapdescription","maptitle","updated_date","status")VALUES($1,$2,$3,$4,$5,$6,$7)RETURNING *',
                 [ 
                 userInput.Emp_id,
                 userInput.Employee_id,
                 userInput.created_date,
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





module.exports = point_tracking;

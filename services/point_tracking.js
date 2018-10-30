
"use strict";

var _ = require("lodash"),
        db = require("../db"),
        async = require("async");

function pooint_tracking() {}


pooint_tracking.PointTrackMaps = function (userInput, resultCallback) {

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


pooint_tracking.PointTrackMapSpots = function (userInput, resultCallback) {

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



module.exports = pooint_tracking;

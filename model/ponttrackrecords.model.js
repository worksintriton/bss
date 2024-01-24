const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const pointTrackRecordsSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  createdby: { type: String },
  createdtime: { type: String },
  updatedby: { type: String },
  updatedtime: { type: String },
  totaltime: { type: String },
  totalmeters: { type: String },
  PointTrackMaprefid: { type: String },
  startlat: { type: String },
  startlon: { type: String },
  endlat: { type: String },
  endlon: { type: String },
  isactive: { type: String },
  starttime: { type: String },
  endtime: { type: String },
});
pointTrackRecordsSchema.plugin(timestamps);
mongoose.model("point_track_records", pointTrackRecordsSchema);
module.exports = mongoose.model("point_track_records");

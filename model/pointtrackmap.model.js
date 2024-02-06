const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const pointTrackMapSchema = new mongoose.Schema({
  Emp_id: { type: String },
  Employee_Name: { type: String },
  site_id: { type: objectId },
  site_name: { type: String },
  notification_title: { type: String },
  title: { type: String },
  description: { type: String },
  totaltime: { type: String },
  totalmeters: { type: String },
  startlat: { type: String },
  startlon: { type: String },
  endlat: { type: String },
  endlon: { type: String },
  isactive: { type: Boolean, default: true },
  createdby: { type: String },
  createdtime: { type: String },
  qrcode: { type: String },
  updatedby: { type: String },
  updatedtime: { type: String },
});
pointTrackMapSchema.plugin(timestamps);
mongoose.model("point_track_map", pointTrackMapSchema);
module.exports = mongoose.model("point_track_map");

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
  lat1: { type: Number },
  lng1: { type: Number },
  lat2: { type: Number },
  lng2: { type: Number },
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

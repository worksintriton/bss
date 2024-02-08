const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const pointTrackMapSpotSchema = new mongoose.Schema({
  position: { type: String },
  site_id: { type: objectId },
  PointTrackMaprefid: { type: objectId },
  title: { type: String },
  description: { type: String },
  lat: { type: String },
  lon: { type: String },
  accepteddistinmeter: { type: String },
  isactive: { type: Boolean, default: true },
  date: { type: Date },
  createdby: { type: String },
  createdtime: { type: String },
  updatedby: { type: objectId },
  updatedtime: { type: String },
  marked_time: { type: String },
  marked_lat: { type: String },
  marked_lon: { type: String },
  marked_by: { type: objectId },
  is_marked: { type: String },
});
pointTrackMapSpotSchema.plugin(timestamps);
mongoose.model("point_track_map_spot", pointTrackMapSpotSchema);
module.exports = mongoose.model("point_track_map_spot");

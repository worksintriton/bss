const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const pointTrackRecordsSpotSchema = new mongoose.Schema({
  PointTrackRecordsid: { type: String },
  position: { type: String },
  title: { type: String },
  description: { type: String },
  lat: { type: String },
  lon: { type: String },
  accepteddistinmeter: { type: String },
  isactive: { type: String },
  createdby: { type: String },
  createdtime: { type: String },
  updatedby: { type: String },
  updatedtime: { type: String },
  marked_time: { type: String },
  marked_lat: { type: String },
  marked_lon: { type: String },
  marked_by: { type: String },
  is_marked: { type: String },
});
pointTrackRecordsSpotSchema.plugin(timestamps);
mongoose.model("point_track_Records_Spot", pointTrackRecordsSpotSchema);
module.exports = mongoose.model("point_track_Records_Spot");

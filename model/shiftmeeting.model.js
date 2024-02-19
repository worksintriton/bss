const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const shiftMeetingSchema = new mongoose.Schema({
  Empolyee_id: { type: String },
  Name: { type: String },
  image: { type: String },
  site_id: { type: objectId },
  site_name: { type: String },
  submittedBy: { type: objectId },
  date: { type: Date },
  lat: { type: String },
  lon: { type: String },
  isActive: { type: Boolean, default: true },
});
shiftMeetingSchema.plugin(timestamps);
mongoose.model("shift_meeting", shiftMeetingSchema);
module.exports = mongoose.model("shift_meeting");

const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const employeeTrackSchema = new mongoose.Schema({
  Employee_id: { type: String },
  Lat: { type: String },
  Long: { type: String },
  updated_at: { type: Date },
  Name: { type: String },
});
employeeTrackSchema.plugin(timestamps);
mongoose.model("employee_track", employeeTrackSchema);
module.exports = mongoose.model("employee_track");

const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const mapUsersSchema = new mongoose.Schema({
  Emp_id: { type: String, ref: "usermanage" },
  Employee_name: { type: String },
  Map_id: { type: objectId },
  gender: { type: String },
  contact_no: { type: String },
  Email_id: { type: String },
  Client_place: { type: String },
  Address: { type: String },
  title: { type: String },
  status: { type: String },
  notification_title: { type: String },
});
mapUsersSchema.plugin(timestamps);
mongoose.model("map_users", mapUsersSchema);
module.exports = mongoose.model("map_users");

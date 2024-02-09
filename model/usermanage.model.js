const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const userManageSchema = new mongoose.Schema({
  Name: { type: String },
  Empolyee_id: { type: String },
  Designation: { type: String },
  Level: { type: String },
  Phone_number: { type: String },
  Email_id: { type: String },
  Password: { type: String },
  Add_by: { type: String },
  profile_image: { type: String },
  qrcode: { type: String },
});
userManageSchema.plugin(timestamps);
mongoose.model("usermanage", userManageSchema);
module.exports = mongoose.model("usermanage");

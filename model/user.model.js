const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const userSchema = new mongoose.Schema({
  flat_no: { type: String },
  block_name: { type: String },
  user_name: { type: String },
  user_phone: { type: String },
  password: { type: String },
  email_id: { type: String },
  owner_tent: { type: String },
  type: { type: String },
  appartment_name: { type: String },
});
userSchema.plugin(timestamps);
mongoose.model("user", userSchema);
module.exports = mongoose.model("user");

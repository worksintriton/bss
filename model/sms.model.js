const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const smsSchema = new mongoose.Schema({
  sms: { type: String },
  updatetime: { type: Date },
});
smsSchema.plugin(timestamps);
mongoose.model("sms", smsSchema);
module.exports = mongoose.model("sms");

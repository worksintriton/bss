const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const qrcodeSchema = new mongoose.Schema({
  Empolyee_id: { type: String },
  Name: { type: String },
  Email_ID: { type: String },
  Mobile_No: { type: String },
  created: { type: String },
  qrdata: { type: String },
  client_ID: { type: String },
  client_place: { type: String },
  date: { type: String },
});
qrcodeSchema.plugin(timestamps);
mongoose.model("qrcode", qrcodeSchema);
module.exports = mongoose.model("qrcode");

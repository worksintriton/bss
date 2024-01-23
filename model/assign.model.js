const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const assignSchema = new mongoose.Schema({
  client_id: { type: String },
  employee_id: { type: String },
  date: { type: String },
  Employee_name: { type: String },
  Client_Name: { type: String },
});
assignSchema.plugin(timestamps);
mongoose.model("assign", assignSchema);
module.exports = mongoose.model("assign");

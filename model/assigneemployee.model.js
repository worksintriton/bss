const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const assigneEmployeeSchema = new mongoose.Schema({
  client_id: { type: String },
  client_name: { type: String },
  employee_id: { type: String },
  employee_name: { type: String },
  date: { type: String },
});
assigneEmployeeSchema.plugin(timestamps);
mongoose.model("assigne_employee", assigneEmployeeSchema);
module.exports = mongoose.model("assigne_employee");

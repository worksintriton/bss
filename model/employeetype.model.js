const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const employeeTypeSchema = new mongoose.Schema({
  employee_type: { type: String },
});
employeeTypeSchema.plugin(timestamps);
mongoose.model("employee_type", employeeTypeSchema);
module.exports = mongoose.model("employee_type");

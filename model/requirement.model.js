const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const requirementSchema = new mongoose.Schema({
  site_id: { type: String },
  employee_type: { type: String },
  amount: { type: String },
  hrs: { type: String },
  no_of_employee: { type: String },
  total_amount: { type: String },
});
requirementSchema.plugin(timestamps);
mongoose.model("requirement", requirementSchema);
module.exports = mongoose.model("requirement");

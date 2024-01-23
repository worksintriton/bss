const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const financeManagementSchema = new mongoose.Schema({
  title: { type: String },
  descriptions: { type: String },
  date: { type: String },
  type: { type: String },
  total_amount: { type: String },
});
financeManagementSchema.plugin(timestamps);
mongoose.model("finance_management", financeManagementSchema);
module.exports = mongoose.model("finance_management");

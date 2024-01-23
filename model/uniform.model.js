const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const uniformSchema = new mongoose.Schema({
  employee_id: { type: String },
  item: { type: String },
  au: { type: String },
  rate: { type: String },
  remarks: { type: String },
  total_amount: { type: String },
  status: { type: String },
});
uniformSchema.plugin(timestamps);
mongoose.model("uniform", uniformSchema);
module.exports = mongoose.model("uniform");

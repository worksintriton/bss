const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const qualityCheckListSchema = new mongoose.Schema({
  type: { type: String },
  am: { type: String },
  ao: { type: String },
  so: { type: String },
  aso: { type: String },
  sg: { type: String },
  lsg: { type: String },
  fg: { type: String },
  gm: { type: String },
  total: { type: String },
  quality_id: { type: String },
});
qualityCheckListSchema.plugin(timestamps);
mongoose.model("quality_check_list", qualityCheckListSchema);
module.exports = mongoose.model("quality_check_list");

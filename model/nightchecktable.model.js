const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const nightCheckTableSchema = new mongoose.Schema({
  bss_no: { type: String },
  rank: { type: String },
  name: { type: String },
  post: { type: String },
  observation: { type: String },
  sign: { type: String },
  night_id: { type: String },
});
nightCheckTableSchema.plugin(timestamps);
mongoose.model("night_check_table", nightCheckTableSchema);
module.exports = mongoose.model("night_check_table");

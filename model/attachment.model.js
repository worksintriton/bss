const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const attachmentSchema = new mongoose.Schema({
  Emp_id: { type: String },
  title: { type: String },
  path: { type: String },
});
attachmentSchema.plugin(timestamps);
mongoose.model("attachment", attachmentSchema);
module.exports = mongoose.model("attachment");

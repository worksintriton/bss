const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const issueAttachmentsSchema = new mongoose.Schema({
  basepath: { type: String },
  filename: { type: String },
  issue_id: { type: String },
  is_Deleted: { type: String },
});
issueAttachmentsSchema.plugin(timestamps);
mongoose.model("issue_attachments", issueAttachmentsSchema);
module.exports = mongoose.model("issue_attachments");

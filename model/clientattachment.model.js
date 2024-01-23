const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const clientAttachmentSchema = new mongoose.Schema({
  site_id: { type: String },
  title: { type: String },
  path: { type: String },
});
clientAttachmentSchema.plugin(timestamps);
mongoose.model("client_attachment", clientAttachmentSchema);
module.exports = mongoose.model("client_attachment");

const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const feedBackSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  rating: { type: String },
  posted_on: { type: String },
  posted_by: { type: String },
  image: { type: String },
  company_name: { type: String },
});
feedBackSchema.plugin(timestamps);
mongoose.model("feedback", feedBackSchema);
module.exports = mongoose.model("feedback");

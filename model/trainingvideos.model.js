const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const trainingVideosSchema = new mongoose.Schema({
  title: { type: String },
  descriptions: { type: String },
  video_url: { type: String },
  videos_id: { type: String },
  Emp_id:{type:objectId}
});
trainingVideosSchema.plugin(timestamps);
mongoose.model("training_videos", trainingVideosSchema);
module.exports = mongoose.model("training_videos");

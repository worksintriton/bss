const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const trainingLessonSchema = new mongoose.Schema({
  training_title: { type: String },
  training_description: { type: String },
  Emp_id:{type:objectId}
});
trainingLessonSchema.plugin(timestamps);
mongoose.model("training_lesson", trainingLessonSchema);
module.exports = mongoose.model("training_lesson");

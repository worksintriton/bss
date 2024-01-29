const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const trainingSchema = new mongoose.Schema({
  training_title: { type: String },
  training_description: { type: String },
  Emp_id:{type:objectId}
});
trainingSchema.plugin(timestamps);
mongoose.model("training", trainingSchema);
module.exports = mongoose.model("training");

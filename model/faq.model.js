const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const objectId = mongoose.Types.ObjectId;
const faqSchema = new mongoose.Schema({
  questions: { type: String },
  answers: { type: String },
  date: { type: String },
});
faqSchema.plugin(timestamps);
mongoose.model("faq", faqSchema);
module.exports = mongoose.model("faq");

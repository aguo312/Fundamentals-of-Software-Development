// Answer Document Schema
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
  text: { type: String, required: true },
  ans_by: { type: String, required: true },
  ans_date_time: { type: Date, default: Date.now },
});

// Virtual for Answer's URL
AnswerSchema.virtual("url").get(function () {
  return "posts/answer/" + this._id;
});

// Export Model
module.exports = mongoose.model("Answer", AnswerSchema);

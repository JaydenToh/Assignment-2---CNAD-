const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema({
  name: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }]
});

module.exports = mongoose.model("Assessment", assessmentSchema);
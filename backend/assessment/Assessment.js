// Assessment.js
const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  name: String,
  questions: [{ type: String }]
});

const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = Assessment;
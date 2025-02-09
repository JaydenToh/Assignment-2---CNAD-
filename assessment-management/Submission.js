// Submission.js
const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  answers: {
    type: Map,
    of: Number
  },
  totalScore: {
    type: Number,
    required: true
  }
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
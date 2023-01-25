const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("exam", ExamSchema);

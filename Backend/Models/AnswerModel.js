const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "exam",
    required: true,
  },

  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "candidate",
    required: true,
  },

  answered: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
        required: [true, "questions are required."],
      },
      answer: { type: String },
      status: { type: String },
    },
  ],

  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("answer", answerSchema);

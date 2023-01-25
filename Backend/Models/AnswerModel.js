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
});

module.exports = mongoose.model("answer", answerSchema);

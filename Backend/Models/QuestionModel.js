const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  title: {
    english: {
      type: String,
      required: true,
    },
    hindi: {
      type: String,
      required: true,
    },
  },

  options: [
    {
      option: { type: String, required: [true, "all options are required."] },
      english: { type: String, required: [true, "all options are required."] },
      hindi: { type: String, required: [true, "all options are required."] },
    },
  ],
  subject: {
    english: {
      type: String,
      required: true,
    },
    hindi: {
      type: String,
      required: true,
    },
  },
  correctOption: {
    type: String,
    required: true,
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "exam",
    required: true,
  },
});

module.exports = mongoose.model("question", QuestionSchema);

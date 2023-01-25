const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("subject", SubjectSchema);

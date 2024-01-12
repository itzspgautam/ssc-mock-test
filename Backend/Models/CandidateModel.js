const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const candidateSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter you full name."],
    minlength: [4, "Name is too short."],
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "exam",
    required: [true, "Please select exam to enroll"],
  },
  reg: {
    type: String,
    required: [true, "Invalid registration Number."],
  },
  birthdate: {
    type: Date,
    required: true,
  },
  avatar: {
    type: String,
    required: [true, "Please upload passport size photo."],
  },

  role: {
    type: String,
    default: "user",
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("candidate", candidateSchema);

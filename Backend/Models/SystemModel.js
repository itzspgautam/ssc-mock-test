const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const systemSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter you full name."],
    minlength: [4, "Name is too short."],
  },
  password: {
    type: String,
    required: [true, "Please enter paswword."],
    select: false,
  },
  role: {
    type: String,
    default: "system",
  },
});

// pre hash password
systemSchema.pre("save", function (next) {
  if (this.password) {
    var salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});

module.exports = mongoose.model("system", systemSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter you full name."],
    minlength: [4, "Name is too short."],
  },
  username: {
    type: String,
    required: [true, "Please enter username."],
    minlength: [4, "usernmae is too short."],
  },
  password: {
    type: String,
    required: [true, "Please enter paswword."],
    select: false,
  },
  role: {
    type: String,
    default: "Admin",
  },
});

// pre hash password
adminSchema.pre("save", function (next) {
  if (this.password) {
    var salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});

module.exports = mongoose.model("admin", adminSchema);

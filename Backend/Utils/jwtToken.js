const jwt = require("jsonwebtoken");
const catchAsyncError = require("../Middleware/catchAsyncError");

exports.generateToken = async (_id) => {
  return jwt.sign({ data: _id }, process.env.JWT_SECRET);
};

exports.verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return error;
  }
};

// exp: Math.floor(Date.now() / 1000) + 60 * 60,

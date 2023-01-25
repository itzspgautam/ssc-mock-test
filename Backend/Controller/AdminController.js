const catchAsyncError = require("../Middleware/catchAsyncError");
const SystemModel = require("../Models/SystemModel");
const ErrorHandler = require("../Utils/errorHandler");
const { generateToken, verifyToken } = require("../Utils/jwtToken");
const bcrypt = require("bcrypt");
const AdminModel = require("../Models/AdminModel");

exports.AdminLogin = catchAsyncError(async (req, res, next) => {
  const { id, password } = req.body;
  if (!id || !password) {
    return next(new ErrorHandler("Please enter system Id and password", 400));
  }

  try {
    const admin = await AdminModel.findOne({ username: id }).select(
      "+password"
    );
    if (!admin) {
      return next(new ErrorHandler("Invalid Credentials.", 400));
    }

    if (!bcrypt.compareSync(password, admin.password)) {
      return next(new ErrorHandler("Invalid Password.", 401));
    }

    const token = await generateToken(admin._id);
    const adminSafe = await AdminModel.findById(admin._id);
    res.status(201).json({
      success: true,
      token,
      admin: adminSafe,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 401));
  }
});

exports.registerAdmin = catchAsyncError(async (req, res, next) => {
  const { name, id, password } = req.body;
  try {
    const register = await AdminModel.create({
      name,
      username: id,
      password,
    });

    const token = await generateToken(register._id);
    res.status(201).json({
      success: true,
      token,
      admin: {
        _id: register._id,
        id: register.username,
        name: register.name,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error, 401));
  }
});

exports.tokenVerification = catchAsyncError(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new ErrorHandler("Invalid Token", 400));
  }
  let tokenToVerify = req.headers.authorization.split(" ")[1];
  console.log(tokenToVerify);

  verifyToken(tokenToVerify)
    .then(async (token) => {
      const admin = await AdminModel.findById(token.data);
      if (!admin) {
        return next(new ErrorHandler("User not found!", 400));
      }
      res
        .status(200)
        .json({ success: true, token: req.headers.authorization, admin });
    })
    .catch((error) => {
      console.log(error);
      return next(new ErrorHandler("Token expired! Please login again.", 401));
    });
});

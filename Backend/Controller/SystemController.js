const catchAsyncError = require("../Middleware/catchAsyncError");
const SystemModel = require("../Models/SystemModel");
const ErrorHandler = require("../Utils/errorHandler");
const { generateToken } = require("../Utils/jwtToken");
const bcrypt = require("bcrypt");

exports.systemLogin = catchAsyncError(async (req, res, next) => {
  const { id, password } = req.body;
  if (!id || !password) {
    return next(new ErrorHandler("Please enter system Id and password", 400));
  }

  try {
    const system = await SystemModel.findById(id).select("+password");
    if (!system) {
      return next(new ErrorHandler("Invalid System.", 400));
    }

    if (!bcrypt.compareSync(password, system.password)) {
      return next(new ErrorHandler("Invalid Password.", 401));
    }

    const token = await generateToken(system._id);
    const systemSafe = await SystemModel.findById(system._id);
    res.status(201).json({
      success: true,
      token,
      system: systemSafe,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 401));
  }
});

exports.registerSystem = catchAsyncError(async (req, res, next) => {
  const { name, password } = req.body;
  try {
    const register = await SystemModel.create({
      name,
      password,
    });

    const token = await generateToken(register._id);
    res.status(201).json({
      success: true,
      token,
      system: {
        _id: register._id,
        name: register.name,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error, 401));
  }
});

exports.getAllSystem = catchAsyncError(async (req, res, next) => {
  try {
    const systems = await SystemModel.find().select("-password");
    res.status(201).json({
      success: true,
      systems,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 401));
  }
});

const catchAsyncError = require("../Middleware/catchAsyncError");
const SystemModel = require("../Models/SystemModel");
const ErrorHandler = require("../Utils/errorHandler");
const { generateToken } = require("../Utils/jwtToken");
const bcrypt = require("bcrypt");
const CandidateModel = require("../Models/CandidateModel");

// exports.systemLogin = catchAsyncError(async (req, res, next) => {
//   const { id, password } = req.body;
//   if (!id || !password) {
//     return next(new ErrorHandler("Please enter system Id and password", 400));
//   }

//   try {
//     const system = await SystemModel.findById(id).select("+password");
//     if (!system) {
//       return next(new ErrorHandler("Invalid System.", 400));
//     }

//     if (!bcrypt.compareSync(password, system.password)) {
//       return next(new ErrorHandler("Invalid Password.", 401));
//     }

//     const token = await generateToken(system._id);
//     const systemSafe = await SystemModel.findById(system._id);
//     res.status(201).json({
//       success: true,
//       token,
//       system: systemSafe,
//     });
//   } catch (error) {
//     return next(new ErrorHandler(error, 401));
//   }
// });

exports.registerCandidate = catchAsyncError(async (req, res, next) => {
  const { name, birthdate, exam, reg, avatar } = req.body;
  try {
    const register = await CandidateModel.create({
      name,
      birthdate,
      reg,
      avatar,
      exam,
    });

    res.status(201).json({
      success: true,
      candidate: {
        _id: register._id,
        name: register.name,
        reg: register.reg,
        exam: register.exam,
        avatar: register.avatar,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error, 401));
  }
});

exports.getCandidate = catchAsyncError(async (req, res, next) => {
  const { reg } = req.query;
  try {
    const candidate = await CandidateModel.findOne({ reg }).populate("exam");

    if (candidate) {
      res.status(201).json({
        success: true,
        candidate,
      });
    } else {
      return next(new ErrorHandler("Invalid registration number", 401));
    }
  } catch (error) {
    return next(new ErrorHandler(error, 401));
  }
});

exports.getCandidates = catchAsyncError(async (req, res, next) => {
  try {
    const candidates = await CandidateModel.find().sort("-createdDate");

    if (candidates) {
      res.status(201).json({
        success: true,
        count: candidates.length,
        candidates,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 401));
  }
});

// exports.getAllSystem = catchAsyncError(async (req, res, next) => {
//   try {
//     const systems = await SystemModel.find().select("-password");
//     res.status(201).json({
//       success: true,
//       systems,
//     });
//   } catch (error) {
//     return next(new ErrorHandler(error, 401));
//   }
// });

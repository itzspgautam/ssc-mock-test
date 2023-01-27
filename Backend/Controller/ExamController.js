const catchAsyncError = require("../Middleware/catchAsyncError");
const SystemModel = require("../Models/SystemModel");
const ErrorHandler = require("../Utils/errorHandler");
const { generateToken } = require("../Utils/jwtToken");
const bcrypt = require("bcrypt");
const CandidateModel = require("../Models/CandidateModel");
const ExamModel = require("../Models/ExamModel");

exports.createExam = catchAsyncError(async (req, res, next) => {
  const { title, date, duration } = req.body;
  try {
    const exam = await ExamModel.create({
      title,
      date,
      duration,
    });

    res.status(201).json({
      success: true,
      exam,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 401));
  }
});

exports.getAllExam = catchAsyncError(async (req, res, next) => {
  try {
    const exams = await ExamModel.find();
    res.status(201).json({
      success: true,
      exams,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 401));
  }
});

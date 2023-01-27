const catchAsyncError = require("../Middleware/catchAsyncError");
const AnswerModel = require("../Models/AnswerModel");
const ExamModel = require("../Models/ExamModel");
const QuestionModel = require("../Models/QuestionModel");
const SubjectModel = require("../Models/SubjectModel");
const ErrorHandler = require("../Utils/errorHandler");

// exports.getExam = (exam) =>
//   catchAsyncError(async (req, res, next) => {
//     try {
//       const exam = await ExamModel.find(exam);
//       res.status(201).json({
//         success: true,
//         exam,
//       });
//     } catch (error) {
//       return next(new ErrorHandler("All fields are required", 400));
//     }
//   });

// exports.getAllExams = () =>
//   catchAsyncError(async (req, res, next) => {
//     try {
//       const exams = await ExamModel.find();
//       res.status(201).json({
//         success: true,
//         exams,
//       });
//     } catch (error) {
//       return next(new ErrorHandler("All fields are required", 400));
//     }
//   });

// exports.createSubject = catchAsyncError(async (req, res, next) => {
//   try {
//     const subject = await SubjectModel.create(req.body);
//     res.status(201).json({
//       success: true,
//       subject,
//     });
//   } catch (error) {
//     return next(new ErrorHandler("All fields are required", 400));
//   }
// });

exports.createQuestion = catchAsyncError(async (req, res, next) => {
  try {
    const question = await await QuestionModel.create(req.body);

    res.status(201).json({
      success: true,
      question,
    });
  } catch (error) {
    return next(new ErrorHandler("All fields are required", 400));
  }
});

exports.getQuestion = catchAsyncError(async (req, res, next) => {
  exam = req.body.exam;
  try {
    const questions = await QuestionModel.find({ exam });
    res.status(201).json({
      success: true,
      questions,
    });
  } catch (error) {
    return next(new ErrorHandler("All fields are required", 400));
  }
});

exports.submitAnswer = catchAsyncError(async (req, res, next) => {
  try {
    const answers = await AnswerModel.create(req.body);
    res.status(201).json({
      success: true,
      answers,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

exports.getSubmittedAnswer = catchAsyncError(async (req, res, next) => {
  const reg = req.query.reg;
  try {
    const submission = await AnswerModel.findOne({ candidate: reg });
    res.status(201).json({
      success: true,
      submission,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

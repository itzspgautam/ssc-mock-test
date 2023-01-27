const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../Utils/errorHandler");
const { verifyToken } = require("../Utils/jwtToken");
const SystemModel = require("../Models/SystemModel");
const AdminModel = require("../Models/AdminModel");

exports.systemAuth = catchAsyncError(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new ErrorHandler("nan_Invalid Token", 400));
  }
  let token = req.headers.authorization.split(" ")[1];

  verifyToken(token)
    .then(async (token) => {
      const system = await SystemModel.findById(token.data);

      if (!system) {
        return next(
          new ErrorHandler(
            "You are not authorised to access this resource!",
            400
          )
        );
      }
      req.system = system;
      next();
    })
    .catch((error) => {
      return next(new ErrorHandler("Token expired! Please login again.", 401));
    });
});

exports.adminAuth = catchAsyncError(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new ErrorHandler("Invalid Token", 400));
  }
  let token = req.headers.authorization.split(" ")[1];

  verifyToken(token)
    .then(async (token) => {
      const admin = await AdminModel.findById(token.data);
      if (!admin) {
        return next(
          new ErrorHandler(
            "You are not authorised to access this resource!",
            401
          )
        );
      }
      req.user = admin;
      next();
    })
    .catch((error) => {
      return next(new ErrorHandler("Token expired! Please login again.", 401));
    });
});

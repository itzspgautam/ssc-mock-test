const express = require("express");
const { createExam, getAllExam } = require("../Controller/ExamController");
const { adminAuth } = require("../Middleware/auth");

const router = express.Router();

router.route("/exam/new").post(adminAuth, createExam);

router.route("/exams").get(getAllExam);

module.exports = router;

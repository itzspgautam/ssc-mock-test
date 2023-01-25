const express = require("express");
const { createExam, getAllExam } = require("../Controller/ExamController");

const router = express.Router();

router.route("/exam/new").post(createExam);

router.route("/exams").get(getAllExam);

module.exports = router;

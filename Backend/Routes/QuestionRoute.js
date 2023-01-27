const express = require("express");
const {
  createQuestion,
  createSubject,
  createExam,
  getQuestion,
  submitAnswer,
  getSubmittedAnswer,
} = require("../Controller/QuestionController");
const { systemAuth, adminAuth } = require("../Middleware/auth");
const router = express.Router();

router.route("/question").post(adminAuth, createQuestion);

router.route("/getquestions").post(systemAuth, getQuestion);

router.route("/answer/submit").post(systemAuth, submitAnswer);
router.route("/answer/submition").get(getSubmittedAnswer);

module.exports = router;

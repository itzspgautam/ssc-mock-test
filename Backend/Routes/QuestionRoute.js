const express = require("express");
const {
  createQuestion,
  createSubject,
  createExam,
  getQuestion,
  submitAnswer,
  getSubmittedAnswer,
} = require("../Controller/QuestionController");
const router = express.Router();

router.route("/question").post(createQuestion);

router.route("/questions").get(getQuestion);

router.route("/answer/submit").post(submitAnswer);
router.route("/answer/submition").get(getSubmittedAnswer);

module.exports = router;

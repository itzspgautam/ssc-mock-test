const express = require("express");
const { getCandidate } = require("../Controller/CandidateController");

const {
  systemLogin,
  registerSystem,
  getAllSystem,
  tokenVerificationSystem,
} = require("../Controller/SystemController");
const { systemAuth, adminAuth } = require("../Middleware/auth");
const router = express.Router();

router.route("/system/login").post(systemLogin);
router.route("/system/register").post(adminAuth, registerSystem);

router.route("/system/candidate").get(getCandidate);

router.route("/systems").get(getAllSystem);

router.route("/system/verify").post(tokenVerificationSystem);

module.exports = router;

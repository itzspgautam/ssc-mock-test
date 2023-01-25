const express = require("express");
const { getCandidate } = require("../Controller/CandidateController");

const {
  systemLogin,
  registerSystem,
  getAllSystem,
} = require("../Controller/SystemController");
const router = express.Router();

router.route("/system/login").post(systemLogin);
router.route("/system/register").post(registerSystem);

router.route("/system/candidate").get(getCandidate);

router.route("/systems").get(getAllSystem);

module.exports = router;

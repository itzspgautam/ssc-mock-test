const express = require("express");
const {
  AdminLogin,
  registerAdmin,
  tokenVerification,
} = require("../Controller/AdminController");
const { registerCandidate } = require("../Controller/CandidateController");

const router = express.Router();

router.route("/admin/login").post(AdminLogin);
router.route("/admin/register").post(registerAdmin);
router.route("/admin/verify").post(tokenVerification);

router.route("/admin/candidate/register").post(registerCandidate);

module.exports = router;

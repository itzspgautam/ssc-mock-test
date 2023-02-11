const express = require("express");
const {
  AdminLogin,
  registerAdmin,
  tokenVerification,
} = require("../Controller/AdminController");
const {
  registerCandidate,
  getCandidates,
  getParticipation,
} = require("../Controller/CandidateController");
const { adminAuth } = require("../Middleware/auth");

const router = express.Router();

router.route("/admin/login").post(AdminLogin);
router.route("/admin/register").post(adminAuth, registerAdmin);
router.route("/admin/verify").post(tokenVerification);

router.route("/admin/candidates").post(adminAuth, getCandidates);

router.route("/admin/candidate/register").post(adminAuth, registerCandidate);

router.route("/admin/participation").post(adminAuth, getParticipation);

module.exports = router;

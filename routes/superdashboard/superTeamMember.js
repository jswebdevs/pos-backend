// router/superDashboard/superTeamMember.js
const express = require("express");
const router = express.Router();

const { getAllTeamMembers } = require("../../controllers/superDashboard/superTeamController");

// GET /api/super-team-members
router.get("/super-team-members", getAllTeamMembers);

module.exports = router;

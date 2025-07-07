// router/superDashboard/superTeamMember.js
const express = require("express");
const router = express.Router();

const { createsuperTeamMember} = require("../../controllers/superDashboard/superTeamController");

// Post super-team-members
router.post("/create-new-member", createsuperTeamMember);

module.exports = router;

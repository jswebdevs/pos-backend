// controller/superTeamMemberController.js
const { getSuperTeamCollection } = require("../../config/db");

const getAllTeamMembers = async (req, res) => {
  try {
    const collection = getSuperTeamCollection();
    if (!collection) {
      return res.status(500).json({ error: "Database not initialized" });
    }

    const members = await collection.find({}).toArray();

    // Remove _id for cleaner frontend data if you want
    const sanitizedMembers = members.map(({ _id, ...rest }) => rest);

    res.status(200).json(sanitizedMembers);
  } catch (error) {
    console.error("Error fetching team members:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllTeamMembers,
};

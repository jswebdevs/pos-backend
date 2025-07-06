require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectToDatabase } = require('./config/db');
const superTeamMemberRoutes = require("./routes/superdashboard/superTeamMember");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/superteam", superTeamMemberRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start server after DB connects
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}!`);
  });
}).catch((err) => {
  console.error("🔥 Could not start server due to DB error");
});

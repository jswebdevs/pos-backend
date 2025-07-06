require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",  // update with your frontend origin
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Basic health check route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}!`);
});

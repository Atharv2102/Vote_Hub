const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 5002;

// Enable CORS 
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", require("./routes/authRoutes.js"));
app.use("/api/vote", require("./routes/voteRoutes.js"));

// Start server
app.listen(PORT, () => {
  connectDB();
  console.log("Server running on port", PORT);
});

const express = require('express');
const cors = require('cors'); // Import cors package
const connectDB = require('./config/db.js');

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS 
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes.js"));

app.listen(PORT, () => {
  connectDB();
  console.log("Server running on port", PORT);
});

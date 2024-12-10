const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;

// Passport configuration
require('./config/passport'); // Import passport.js config

// Connect to the database (if needed for other operations)
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Initialize Passport.js and session
app.use(passport.initialize());
app.use(passport.session());

// Routes

app.get('/google/callback' , passport.authenticate('google' , {
  failureRedirect: '/login'}), (req , res)=>{
  console.log("hell")
  const user = req.user.user;  // Extract user details from `user` object
  const token = req.user.token;  // Extract the JWT token from `user` object
  console.log(token);
  // Set the token in the cookie or response headers
  res.cookie('token', token, { 
    httpOnly: false, 
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'Lax', // Or 'Strict' depending on your needs
});
console.log("Token set in cookie from callback");
  
res.redirect('http://localhost:3000/profile');
});
app.get('/vote', (req, res) => {
  res.send('Welcome to the Server!'); // Replace this with actual content if needed
});
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/auth" , require("./routes/oAuth"));
app.use("/api/vote", require("./routes/voteRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

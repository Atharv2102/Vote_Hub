// config/session.js
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


console.log('MongoDB URI:', process.env.MONGO_URI);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI, // MongoDB URI
  collection: 'sessions' // Collection to store sessions
});

store.on('error', (error) => {
  console.log('Session store error:', error);
});
store.on('connected', () => {
  console.log('Connected to MongoDB session store');
});

module.exports = session({
  secret: 'DHAILITARDUDH', 
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 30 * 60 * 1000,//3 din
    httpOnly: true,
    secure: false, 
  }
});

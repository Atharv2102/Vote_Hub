// config/session.js
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI, // MongoDB URI
  collection: 'sessions' // Collection to store sessions
});

store.on('error', (error) => {
  console.log('Session store error:', error);
});

module.exports = session({
  secret: '1234DHAILITARDUDH', // Replace with a strong secret key
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 2 * 60 * 1000 // 2-minute session expiration
  }
});

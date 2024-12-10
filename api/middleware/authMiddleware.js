
exports.isAuthenticated = (req, res, next) => {
  console.log("Complete session object in middleware:", JSON.stringify(req.session, null, 2));

  if (req.session) {
    return next();
  } else {
   // console.log("unauthorized hai ")
  res.status(401).json({ message: 'Unauthorized! Please log in.' });
  }
};

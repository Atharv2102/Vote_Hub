
exports.isAuthenticated = (req, res, next) => {
  console.log("from auth middleware = "+req.session.isAuthenticated);
  console.log("auth middleware = "+req.session)
  if (req.session.isAuthenticated) {
    return next();
  } else {
   // console.log("unauthorized hai ")
  res.status(401).json({ message: 'Unauthorized! Please log in.' });
  }
};

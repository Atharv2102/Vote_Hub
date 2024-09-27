
exports.isAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) {
    return next();
  } else {
   // console.log("unauthorized hai ")
    res.status(401).json({ message: 'Unauthorized! Please log in.' });
  }
};

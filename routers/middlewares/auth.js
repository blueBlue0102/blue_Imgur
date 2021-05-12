module.exports = function (req, res, next) {
  if (req.user) next();
  else {
    res.status(400);
    next(new Error("Unauthorized request"));
  }
};

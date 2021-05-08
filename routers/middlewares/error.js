module.exports = function (err, req, res, next) {
  res.send(err.message);
};

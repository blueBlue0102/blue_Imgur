const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.warn({
    errorMessage: err.message,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  })
  res.send(err.message);
};

const logger = require("../../logger");

module.exports = function (err, req, res, next) {
  logger.warn({
    errorMessage: err.message,
    ip: req.headers["x-real-ip"],
    userAgent: req.headers["user-agent"],
  })
  res.end(err.message);
};

const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.warn({
    errorMessage: err.message,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  })
  console.log("我的 error middleware 抓到")
  res.end(err.message);
};

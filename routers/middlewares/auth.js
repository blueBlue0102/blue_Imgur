const logger = require("../../logger");

module.exports = function (req, res, next) {
  if (req.user) next();
  else {
    logger.warn({
      message: "Unauthorized request",
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });
    res.status(401).end("Unauthorized request");
  }
};

const winston = require("winston");
const { format, transports } = winston;

const logger = winston.createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({ filename: "log/error.log", level: "error" }),
    new transports.File({ filename: "log/warn.log", level: "warn" }),
    new transports.File({ filename: "log/info.log", level: "info" }),
  ],
});
winston.add(logger);

module.exports = logger;

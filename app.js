require("dotenv").config();
const path = require("path");

// logger
const winston = require("winston");
const { format } = winston;
winston.configure({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new winston.transports.File({ filename: "log/error.log", level: "error" }),
    new winston.transports.File({ filename: "log/warn.log", level: "warn" }),
    new winston.transports.File({ filename: "log/info.log", level: "info" }),
  ],
});

// express
const express = require("express");
const app = express();
app.use(express.static(path.join(__dirname, process.env.IMAGE_STORAGE_PATH)));
app.use(express.static("dist"));
app.use(require("body-parser").urlencoded({ extended: true }));

// express session
const session = require("express-session");

// Redis
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient(process.env.REDIS_URL);
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365, httpOnly: true },
  })
);

// Passport
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

// ejs
app.set("views", "./views");
app.set("view engine", "ejs");

// routes
require("./routers/index")(app);

// server
let server = app.listen(process.env.PORT, () => {
  console.log(`App listening at ${process.env.SERVER_HOST_NAME}`);
});

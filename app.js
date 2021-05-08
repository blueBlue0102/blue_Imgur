require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);

const app = express();
const redisClient = redis.createClient(process.env.REDIS_URL);

app.use(express.static(path.join(__dirname, process.env.IMAGE_STORAGE_PATH)));
app.use(express.static("dist"));
app.use(require("body-parser").urlencoded({ extended: true }));
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
app.use(passport.initialize());
app.use(passport.session());

app.set("views", "./views");
app.set("view engine", "ejs");

require("./routers/index")(app);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});

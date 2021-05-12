module.exports = function (app) {
  app.get("/", require("./home"));
  app.post(
    "/upload",
    require("./middlewares/auth"),
    require("./middlewares/upload_amount_limit"),
    require("./upload")
  );
  app.get("/login", require("./login"));
  app.get("/logout", require("./logout"));
  app.get("/redirect", require("./redirect"));
  app.use(require("./middlewares/error"));
};

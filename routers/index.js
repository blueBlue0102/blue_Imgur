module.exports = function (app) {
  app.get("/", function (req, res) {
    res.status(200).render("upload");
  });
  app.use("/upload", require("./upload"));
};

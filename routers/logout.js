module.exports = function (req, res) {
  req.session.destroy();
  res.status(200).redirect("/");
};

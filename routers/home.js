module.exports = function (req, res) {
  if (!req.user) res.status(200).render("login");
  else res.status(200).render("upload");
};

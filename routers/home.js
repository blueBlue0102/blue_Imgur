const sequelize = require("../models/index");

module.exports = async function (req, res) {
  if (!req.user) res.status(200).render("login");
  else {
    const user = await sequelize.models.User.findByPk(req.user.id);
    if (user === null) {
      // create account
      sequelize.models.User.create({
        google_id: req.user.id,
        display_name: req.user.displayName,
        last_login_date: Date.now(),
      });
    } else {
      // update account login time
      user.update({ last_login_date: Date.now() });
    }
    res.status(200).render("upload");
  }
};

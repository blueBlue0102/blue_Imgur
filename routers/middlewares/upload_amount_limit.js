const sequelize = require("../../models/index");

module.exports = async function (req, res, next) {
  const { account_level, upload_amount } = await sequelize.models.User.findByPk(req.user.id);
  if (account_level === "Guest" && upload_amount >= process.env.LIMIT_AMOUNT_GUEST) {
    res.status(400);
    next(new Error(`普通帳號只能上傳 ${process.env.LIMIT_AMOUNT_GUEST} 張圖！`));
  } else next();
};

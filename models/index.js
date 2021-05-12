const winston = require("winston");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);
const modelDefiners = [require("./user.model"), require("./file.model")];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

(async () => {
  try {
    await sequelize.sync();
  } catch (err) {
    winston.error({
      errorMessage: err.message,
    });
  }
})();

module.exports = sequelize;

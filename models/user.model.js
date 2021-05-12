// user_id: primary key
// google_id: unique
// display_name
// account_level: guest, user, admin
// registration_date

const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      google_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      display_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      account_level: {
        type: DataTypes.STRING,
        defaultValue: "Guest",
        allowNull: false,
      },
      upload_amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      last_login_date: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    },
    {
      tableName: "users",
      timestamps: true,
      createdAt: "registration_date",
      updatedAt: false,
    }
  );
};

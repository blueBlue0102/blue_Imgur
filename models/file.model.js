// file_id: primary key
// user_id: foreign key
// file_name: unique
// upload_date
// expiration_date
const { Sequelize, DataTypes, Deferrable } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "File",
    {
      file_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      google_id: {
        type: DataTypes.STRING,
        references: {
          model: sequelize.models.User,
          key: "google_id",
          // ON DELETE SET NULL & ON UPDATE CASCADE
          deferrable: Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      file_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      expiration_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "files",
      timestamps: true,
      createdAt: "upload_date",
      updatedAt: false,
    }
  );
};

const formidable = require("formidable");
const path = require("path");
const winston = require("winston");
const sequelize = require("../models/index");

const FORMIDABLE_CONFIG = {
  uploadDir: path.join(
    path.dirname(require.main.filename),
    process.env.IMAGE_STORAGE_PATH
  ),

  keepExtensions: true,

  allowEmptyFiles: false,

  maxFileSize: Number(process.env.DATA_MAX_SIZE) * 1024 * 1024,

  filename: function (name, ext, part, form) {
    let result = [];

    // generate string by Math.random()
    const length = 3;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * characters.length))
      );
    }

    // generate string by Date().getTime()
    let ts = String(new Date().getTime());

    for (let i = 1; i < ts.length; i += 3) {
      result.push(Number(ts.substr(i, 3)).toString(36));
    }

    return result.join("") + ext;
  },

  // filter: function ({ name, originalFilename, mimetype }) {
  //   return mimetype && mimetype.includes("image");
  // },
};

module.exports = (req, res, next) => {
  const form = formidable(FORMIDABLE_CONFIG);
  form.parse(req, function (err, fields, files) {
    if (err) {
      winston.error({
        userId: req.user.id,
        userName: req.user.displayName,
        errorMessage: err.message,
        ip: req.ip,
      });
      return res.status(400).end(err.message);
    }

    winston.info({
      userId: req.user.id,
      userName: req.user.displayName,
      fileName: files.file.newFilename,
      ip: req.ip,
    });

    // log file info into database
    sequelize.models.File.create({
      google_id: req.user.id,
      file_name: files.file.newFilename,
      expiration_date: null,
    });

    // upload_amount += 1
    (async () => {
      const user = await sequelize.models.User.findByPk(req.user.id);
      user.increment("upload_amount");
    })();

    res.status(200).json({
      imageName: files.file.newFilename,
      imagePath: path.join(
        process.env.SERVER_HOST_NAME,
        files.file.newFilename
      ),
    });
  });
};

const formidable = require("formidable");
const path = require("path");
const logger = require("../logger");
const sequelize = require("../models/index");
const lib = require("./lib/upload.lib");

const FORMIDABLE_CONFIG = {
  uploadDir: path.join(
    path.dirname(require.main.filename),
    process.env.IMAGE_STORAGE_PATH
  ),

  keepExtensions: true,

  allowEmptyFiles: false,

  maxFileSize: Number(process.env.DATA_MAX_SIZE) * 1024 * 1024,

  filename: lib.generateRandomString,

  filter: lib.mimetypeFilter,
};

module.exports = (req, res, next) => {
  const form = formidable(FORMIDABLE_CONFIG);
  form.parse(req, function (err, fields, files) {
    // error handling
    if (err) {
      logger.error({
        message: "Something failed when upload image",
        userId: req.user.id,
        userName: req.user.displayName,
        errorMessage: err.message,
        ip: req.headers["x-real-ip"],
      });
      return res.status(400).end(`上傳失敗。請確認檔案必須小於 ${process.env.DATA_MAX_SIZE} MB`);
    }

    // logging
    logger.info({
      message: "successfully upload the image",
      userId: req.user.id,
      userName: req.user.displayName,
      fileName: files.file.newFilename,
      ip: req.headers["x-real-ip"],
    });

    // save info of file into database
    sequelize.models.File.create({
      google_id: req.user.id,
      file_name: files.file.newFilename,
      expiration_date: null,
    });

    // database upload_amount += 1
    (async () => {
      const user = await sequelize.models.User.findByPk(req.user.id);
      user.increment("upload_amount");
    })();

    // return json
    res.status(200).json({
      imageName: files.file.newFilename,
      imagePath: path
        .join("https://", process.env.SERVER_HOST_NAME, files.file.newFilename)
        .replace(":/", "://"),
    });
  });
};

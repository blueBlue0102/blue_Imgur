const express = require("express");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const uniqueString = require("../function/generateUniqueString");

const router = express.Router();

const mime = {
  gif: "image/gif",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  jfif: "image/jfif",
  mp4: "video/mp4",
  mov: "video/mov",
  pdf: "pdf",
};

router.post("/", (req, res) => {
  const form = new formidable.IncomingForm();
  form.maxFileSize = process.env.DATA_MAX_SIZE;
  form.parse(req, function (err, fields, files) {
    if (err) return res.status(400).end(err.message);
    const oldPath = files.filetoupload.path;
    fs.readFile(oldPath, (err, data) => {
      if (err) return res.status(400).end(err.message);
      else {
        const fileType =
          mime[path.extname(files.filetoupload.name).slice(1).toLowerCase()] ||
          "WRONG";
        if (fileType === "WRONG")
          return res.status(400).end("錯誤的檔案格式！");
        const newFileName =
          uniqueString() + path.extname(files.filetoupload.name).toLowerCase();
        const newPath = path.join(
          path.dirname(require.main.filename),
          process.env.IMAGE_STORAGE_PATH,
          newFileName
        );
        fs.writeFile(newPath, data, function (err) {
          if (err) return res.status(500).end(err.message);
          else res.end(newFileName);
        });
      }
    });
  });
});

module.exports = router;

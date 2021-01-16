const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const Joi = require('joi');
const config = require('./config');
const uniqueString = require('./function/generateUniqueString');

exports.showIndex = (req, res) => {
    res.sendFile(config.uploadHTML, {root: __dirname });
}

exports.fileUpload = (req, res) => {
    const form = new formidable.IncomingForm();
    form.maxFileSize = config.maxSizeOfData;
    form.parse(req, function (err, fields, files) {
      if (err) return res.status(400).end(err.message);
      const oldPath = files.filetoupload.path;
      fs.readFile(oldPath, (err, data) => {
        if (err) return res.status(400).end(err.message);
        else {
          const fileType = config.mime[path.extname(files.filetoupload.name).slice(1).toLowerCase()] || 'WRONG';
          if (fileType === 'WRONG') return res.status(400).end('錯誤的檔案格式！');
          const newFileName = uniqueString() + path.extname(files.filetoupload.name);
          const newPath = path.join(__dirname, config.imgPath, newFileName);
          fs.writeFile(newPath, data, function (err) {
            if (err) return res.status(500).end(err.message);
            else 
              res.end(newFileName);
          });
        }
      });
    });
}


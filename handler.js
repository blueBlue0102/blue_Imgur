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
      if (err) {res.status(400).send(err.message); return;}
      const oldPath = files.filetoupload.path;
      fs.readFile(oldPath, (err, data) => {
        if (err) {res.status(400).send(err.message); return;}
        else {
          const fileType = config.mime[path.extname(files.filetoupload.name).slice(1).toLowerCase()] || 'WRONG';
          if (fileType === 'WRONG') {res.status(400).send('錯誤的檔案格式！'); return;};
          const newFileName = uniqueString() + path.extname(files.filetoupload.name);
          const newPath = path.join(__dirname, config.imgPath, newFileName);
          fs.writeFile(newPath, data, function (err) {
            if (err) {res.status(500).send(err.message); return;} 
            else 
              res.end(newFileName);
          });
        }
      });
    });
}


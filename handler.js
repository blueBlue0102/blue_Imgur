const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const config = require('./config');
const uniqueString = require('./function/generateUniqueString');

exports.showIndex = (req, res) => {
    res.sendFile('/upload.html', {root: __dirname });
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
          if (files.filetoupload.name === '') {res.status(400).send('沒檔案不能提交'); return};
          const newFileName = uniqueString() + '.' + files.filetoupload.name.split('.').pop();
          const newPath = path.join(__dirname, config.imgPath, newFileName);
          fs.writeFile(newPath, data, function (err) {
            if (err) {res.status(500).send(err.message); return;} 
            else res.redirect(newFileName); 
          });
        }
      });
    });
}


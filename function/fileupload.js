const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const uniqueString = require('./generateUniqueString');

require('express').Router().use(require('./displayImg'));

function fileUpload(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) {res.status(400).send(err.message);};
    var oldPath = files.filetoupload.path;
    fs.readFile(oldPath, (err, data) => {
      if (err) {res.status(400).send(err.message);}
      else {
        if (files.filetoupload.name === '') {res.status(400).send('沒檔案不能提交');return};
        const newFileName = uniqueString() + '.' + files.filetoupload.name.split('.').pop();
        var newPath = path.join(__dirname, '..', 'img', newFileName);
        fs.writeFile(newPath, data, function (err) {
          if (err){ res.status(500).send(err.message); }
          else {
            res.redirect(newFileName);
          }
        });
      }
    });
  });
}

module.exports = fileUpload;
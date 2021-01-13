const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const uniqueString = require('./generateUniqueString');

function fileUpload(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldPath = files.filetoupload.path;
    fs.readFile(oldPath, (err, data) => {
      if (err) {res.status(400).send('沒檔案不能提交');}
      else {
        if (files.filetoupload.name === '') {res.status(400).send('沒檔案不能提交');return};
        var newPath = path.join(__dirname, '..', 'img', uniqueString() + '.' + files.filetoupload.name.split('.').pop());
        fs.writeFile(newPath, data, function (err) {
          if (err){ res.status(400).send('沒檔案不能提交'); }
          else {
            res.write('File uploaded and moved!');
            res.end();
          }
        });
      }
    });
  });
}

module.exports = fileUpload;
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

function fileUpload(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldPath = files.filetoupload.path;
    var newPath = path.join(__dirname, '..', 'img', files.filetoupload.name);
    var rawData = fs.readFileSync(oldPath);
    fs.writeFile(newPath, rawData, function (err) {
      if (err){ res.status(400).send('沒檔案不能提交'); }
      else {
        res.write('File uploaded and moved!');
        res.end();
      }
    });
  });
}

module.exports = fileUpload;
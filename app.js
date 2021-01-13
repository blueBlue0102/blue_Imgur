const express = require('express');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');

const app = express()
const dir = path.join(__dirname, 'img');
const port = 8080

app.use(express.static(dir));

app.get('/', (req, res) => {
    res.sendFile('/upload.html', {root: __dirname });
})

app.post('/fileupload', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldPath = files.filetoupload.path;
      var newPath = path.join(__dirname, 'img', files.filetoupload.name);
      var rawData = fs.readFileSync(oldPath)
      fs.writeFile(newPath, rawData, function (err) {
        if (err){ res.status(400).send('沒檔案不能提交'); }
        else {
          res.write('File uploaded and moved!');
          res.end();
        }
      });
    });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
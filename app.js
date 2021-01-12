const express = require('express');
const formidable = require('formidable');
const fs = require('fs');

const app = express()
const port = 8080

app.get('/', (req, res) => {
    res.sendFile('/upload.html', {root: __dirname });
})

app.post('/fileupload', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldPath = files.filetoupload.path;
      var newPath = __dirname + '/img' + '/' + files.filetoupload.name;
      var rawData = fs.readFileSync(oldPath)
      fs.writeFile(newPath, rawData, function (err) {
        if (err){
          res.send('ERROR!');
        }
        else {
          res.write('File uploaded and moved!');
          res.end();
        }
      });
    });
})

app.get('/img/:file', (req, res) => {
  
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
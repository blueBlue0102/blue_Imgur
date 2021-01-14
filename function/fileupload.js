const formidable = require('formidable');
const path = require('path');
const fs = require('fs/promises');
const uniqueString = require('./generateUniqueString');

require('express').Router().use(require('./displayImg'));

async function fileUpload(req, res) {
  // 創建 formidable 物件，並且將 req 傳入做解析
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    // formidable 解析失敗
    if (err) {res.status(400).send(err.message);};
    // formidable 解析成功後
    const dataPath = files.filetoupload.path;
    try {
      const data = await fs.readFile(dataPath);
      
      await fs.writeFile(data)
    } catch (err) {

    }
    
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
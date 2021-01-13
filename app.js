const express = require('express');
const fileUpload = require('./function/fileupload');

const app = express()
const port = 8080
const dir = require('path').join(__dirname, 'img');

app.use(express.static(dir));

app.get('/', (req, res) => {
    res.sendFile('/upload.html', {root: __dirname });
})

app.post('/fileupload', (req, res) => fileUpload(req, res));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
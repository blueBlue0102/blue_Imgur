const express = require('express');
const fileUpload = require('./function/fileupload');
const display = require('./function/displayImg');

const app = express()
const port = 8080

app.use(display);

app.get('/', (req, res) => {
    res.sendFile('/upload.html', {root: __dirname });
})

app.post('/fileupload', (req, res) => fileUpload(req, res));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
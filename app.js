const express = require('express');
const path = require('path');
const router = require('./router');
const config = require('./config');

const app = express()

app.use(express.static(path.join(__dirname, config.imgPath)));
app.use(router);

app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}`)
})
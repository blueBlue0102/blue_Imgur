const express = require('express');
const handler = require('./handler');

const router = express.Router();

router
.get('/', handler.showIndex)
.post('/fileupload', handler.fileUpload)

module.exports = router;

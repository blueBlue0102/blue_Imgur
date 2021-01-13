const express = require('express');

const router = express.Router()
const dir = require('path').join(__dirname, '..', 'img');

router.use(express.static(dir));

module.exports = router;
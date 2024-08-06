const express = require('express');
const { recordSale } = require('../controllers/sales');
const router = express.Router();

router.post('/', recordSale);

module.exports = router;

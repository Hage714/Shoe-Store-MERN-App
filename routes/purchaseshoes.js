const express = require('express');
const { addPurchasedShoe, getPurchasedShoes, updatePurchasedShoe, deletePurchasedShoe } = require('../controllers/purchaseshoes');

const router = express.Router();

router.post('/', addPurchasedShoe);
router.get('/', getPurchasedShoes);
router.put('/:id', updatePurchasedShoe);
router.delete('/:id', deletePurchasedShoe);

module.exports = router;


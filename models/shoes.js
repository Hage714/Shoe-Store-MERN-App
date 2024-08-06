const mongoose = require('mongoose');

const ShoeSchema = new mongoose.Schema({
    type: String,
    quantity: Number,
    price: Number,
    image: String
});

module.exports = mongoose.model('Shoe', ShoeSchema);

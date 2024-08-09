const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    shoe: { type: mongoose.Schema.Types.ObjectId, ref: 'Shoe' },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Sale', SaleSchema);

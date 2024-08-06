const mongoose = require('mongoose');

const PurchaseshoeSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    type: String,
    quantity: Number,
    price: Number,
    purchaseDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Purchaseshoe', PurchaseshoeSchema);


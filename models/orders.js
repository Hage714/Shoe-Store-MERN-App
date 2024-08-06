const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    totalCost: Number,
    orderStatus: {
        type: String,
        enum: ['PENDING', 'SHIPPED', 'DELIVERED'],
        default: 'PENDING',
    },
    datePlaced: {
        type: Date,
        default: Date.now,
    }
});


const OrderItemSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    type: String,
    quantity: Number,
    unit_price: Number,

});


const Order = mongoose.model('Order', OrderSchema);
const OrderItem = mongoose.model('OrderItem', OrderItemSchema);

module.exports = { Order, OrderItem };
const { Order, OrderItem } = require('../models/orders');
const Customer = require('../models/customers');
const Shoe = require('../models/shoes');
const Purchaseshoe = require('../models/purchaseshoes');

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createOrder = async (req, res) => {
    const { items, totalCost, orderStatus } = req.body;

    try {

        const customer = await Customer.findOne({ user: req.user.id });

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        const order = await Order.create({
            customer: customer._id,
            totalCost: totalCost,
            orderStatus: orderStatus,
        });
        if (!order) return res.status(400).send({ message: 'Order not created' });

        const orderItems = items.map(item => {
            return { type: item.id, order: order._id, quantity: item.quantity, unit_price: item.price };
        });

        const purchasedshoes = items.map(item => {
            return { type: item.id, customer: customer._id, quantity: item.quantity, price: item.price };
        })

        const newOrderItems = await OrderItem.insertMany(orderItems)
        const newPurchasedshoes = await Purchasedshoe.insertMany(purchasedshoes)
        if (!newOrderItems) return res.status(400).send({ error: 'Order items not created' });
        res.send(newOrderItems).status(201);

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.title = req.body.title || order.title;
        order.price = req.body.price || order.price;
        order.quantity = req.body.quantity || order.quantity;
        order.total = req.body.total || order.total;

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        await order.deleteOne();
        res.json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllOrders,
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder
}
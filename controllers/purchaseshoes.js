const Purchaseshoe = require('../models/purchaseshoes');
const Customer = require('../models/customers');
const Shoe = require('../models/shoes');

const addPurchasedShoe = async (req, res) => {
    try {
        const { type, quantity, price, purchaseDate } = req.body;
        const customer = await Customer.findOne({ user: req.user.id });

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        const purchasedShoe = await Shoe.findById({ _id: type });
        if (!purchasedShoe) {
            return res.status(404).json({ error: 'Shoe not found' });
        }
        if (quantity > purchasedShoe.quantity) {
            return res.status(400).json({ error: 'Not enough shoes in stock' });
        }
        purchasedShoe.quantity = purchasedShoe.quantity - quantity;
        await purchasedShoe.save();


        // Create a new purchased shoe document
        const newPurchasedShoe = new Purchasedshoe({
            type,
            quantity,
            price,
            purchaseDate,
            customer: customer._id
        });

        // Save the document to the database
        const savedPurchasedShoe = await newPurchasedShoe.save();
        res.status(201).json(savedPurchasedShoe);

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding the purchased shoe' });
    }
};

const getPurchasedShoes = async (req, res) => {
    try {
        console.log({ user: req.user })
        if (req.user.role === 'admin') {
            const purchasedShoes = await Purchasedshoe.find({}).populate("type");
            res.json(purchasedShoes);
        } else {
            const customer = await Customer.findOne({ user: req.user.id });
            if (!customer) {
                return res.status(404).json({ error: 'Customer not found' });
            }
            const purchasedShoes = await Purchasedshoe.find({ customer: customer._id }).populate("type");
            res.status(200).json(purchasedShoes);
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching purchased shoes' });
    }
};

const updatePurchasedShoe = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, price, purchaseDate } = req.body;

        // Update the purchased shoe document
        const updatedPurchasedShoe = await Purchasedshoe.findByIdAndUpdate(id, { type, price, purchaseDate }, { new: true });

        if (!updatedPurchasedShoe) {
            return res.status(404).json({ error: 'Purchased shoe not found' });
        }

        res.status(200).json(updatedPurchasedShoe);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the purchased shoe' });
    }
};

const deletePurchasedShoe = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the purchased shoe document
        const deletedPurchasedShoe = await Purchasedshoe.findByIdAndDelete(id);

        if (!deletedPurchasedShoe) {
            return res.status(404).json({ error: 'Purchased shoe not found' });
        }

        res.status(200).json({ message: 'Purchased shoe deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the purchased shoe' });
    }
};

module.exports = {
    addPurchasedShoe,
    getPurchasedShoes,
    updatePurchasedShoe,
    deletePurchasedShoe
};

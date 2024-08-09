const Sale = require('../models/sales');
const Shoe = require('../models/shoes');
const Customer = require('../models/customers');

const recordSale = async (req, res) => {
    const { shoeId, customerId } = req.body;

    try {
        const shoe = await Shoe.findById(shoeId);
        const customer = await Customer.findById(customerId);

        if (!shoe || !customer) {
            return res.status(404).json({ msg: 'Shoe or Customer not found' });
        }

        const newSale = new Sale({ shoe: shoeId, customer: customerId });
        await newSale.save();

        res.json(newSale);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    recordSale
};

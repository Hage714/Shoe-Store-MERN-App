const Sale = require('../models/sales');
const Book = require('../models/books');
const Customer = require('../models/customers');

const recordSale = async (req, res) => {
    const { bookId, customerId } = req.body;

    try {
        const book = await Book.findById(bookId);
        const customer = await Customer.findById(customerId);

        if (!book || !customer) {
            return res.status(404).json({ msg: 'Book or Customer not found' });
        }

        const newSale = new Sale({ book: bookId, customer: customerId });
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

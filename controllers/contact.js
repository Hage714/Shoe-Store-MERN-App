const Contact = require('../models/contact');

const createContact = async (req, res) => {
    const { name, emailAddress, message } = req.body;

    if (!name || !emailAddress || !message) {
        return res.status(400).json('Error: All fields are required.');
    }

    const newContact = new Contact({
        name,
        emailAddress,
        message,
    });

    try {
        await newContact.save();
        res.status(201).json('Contact added!');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
};

module.exports = { createContact };

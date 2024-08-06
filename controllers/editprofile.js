const asyncHandler = require('express-async-handler');
const User = require('../models/users');
const bcrypt = require('bcryptjs');

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);

    try {
        const user = await User.findById(req.user._id);
        if (user) {
            user.name = name || user.name;
            user.email = email || user.email;
            if (password) {
                hashedPassword = bcrypt.hash(password, 10);
                user.password = hashedPassword;
            }
            await user.save()

            res.send({
                name: name,
                email: email,

            }).status(200);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ error: error.message });
        }
    }

    });

module.exports = { getUserProfile, updateUserProfile };

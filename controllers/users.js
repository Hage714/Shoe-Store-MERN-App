
const User = require('../models/users');

// PUT controller to update user information
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = req.body;

        // Find user by ID and update with new data
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

const getUser = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming user ID comes from URL parameter

        // Find user by ID or adjust based on your authentication strategy
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Optionally filter sensitive data before sending response
        const userToSend = {
            _id: user._id, // Include ID if needed
            name: user.name,
            email: user.email, // Include other relevant fields
            // Exclude sensitive fields (e.g., password)
        };

        res.json(userToSend);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

const getUsers = async (req, res) => {
    try {
        // Optionally add query parameters for filtering or pagination
        const filter = {}; // Replace with your filtering logic based on query params
        const options = {}; // Replace with pagination options if needed

        const users = await User.find(filter, options);

        // Optionally filter sensitive data before sending response
        const usersToSend = users.map((user) => {
            return {
                _id: user._id, // Include ID if needed
                name: user.name,
                email: user.email, // Include other relevant fields
                // Exclude sensitive fields (e.g., password)
            };
        });

        res.json(usersToSend);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};


module.exports = {
    updateUser, getUser, getUsers
};


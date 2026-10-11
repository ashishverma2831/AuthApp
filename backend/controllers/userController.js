const User = require('../models/userModel');

const userController = {
    registerUser: async (req, res) => {
        const user = req.body;
        if(!user.username || !user.email || !user.password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        try {
            const newUser = await User.create(user);
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    loginUser: async (req, res) => {},
    getUserProfile: async (req, res) => {},
    updateUserProfile: async (req, res) => {},
}

module.exports = userController;
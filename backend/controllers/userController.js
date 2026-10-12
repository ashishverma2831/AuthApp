const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {
    registerUser: async (req, res) => {
        const user = req.body;
        if(!user.username || !user.email || !user.password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        try {
            const existingUser = await User.findOne({ email: user.email });
            if(existingUser) {
                return res.status(409).json({ message: 'Email already exists' });
            }
            const salt = await bcrypt.genSalt(12);
            user.password = await bcrypt.hash(user.password, salt);
            const newUser = await User.create(user);
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    loginUser: async (req, res) => {
        const user = req.body;
        if(!user.email || !user.password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }
        try {
            const existingUser = await User.findOne({ email: user.email }).select('+password');
            if(!existingUser) {
                return res.status(404).json({ message: 'User with that email not found' });
            }
            const isMatch = await bcrypt.compare(user.password, existingUser.password);
            console.log('Password match:', isMatch); // Debugging line
            if(!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const { password, ...userWithoutPassword } = existingUser.toObject(); // Exclude password from response
            
            // You can generate a JWT token here if needed and include it in the response
            const token = jwt.sign({ id: existingUser._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
            const refreshToken = jwt.sign({ id: existingUser._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            res.cookie('token', token, { httpOnly: true });
            res.cookie('refreshToken', refreshToken, { httpOnly: true });                                                                                                                                   
            res.status(200).json({ message: 'Login successful', user: userWithoutPassword, token });

        } catch (error) {
            next(error);
        }
    },
    getUserProfile: async (req, res) => {
        const userId = req.user.id;
        try {
            const user = await User.findById(userId).select('-password');
            if(!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ user });
        } catch (error) {
            next(error);
        }
    },
    updateUserProfile: async (req, res) => {},
}

module.exports = userController;
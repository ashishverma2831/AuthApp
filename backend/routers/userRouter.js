const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/refresh', userController.refreshAccessToken);
router.post('/logout', userController.logoutUser);
router.get('/profile', authenticate, userController.getUserProfile);
router.put('/profile', authenticate, userController.updateUserProfile);

module.exports = router;

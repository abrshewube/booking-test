const express = require('express');
const { register, verifyEmail, login,  getUsername,resetPassword } = require('../controllers/authController');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
router.post('/register', register);
router.get('/verify/:token', verifyEmail);
router.post('/login', login);
router.post('/reset-password', resetPassword);
router.get('/username', authenticate, getUsername);

module.exports = router;

const express = require('express');
const { register, verifyEmail, login, resetPassword } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.get('/verify/:token', verifyEmail);
router.post('/login', login);
router.post('/reset-password', resetPassword);

module.exports = router;

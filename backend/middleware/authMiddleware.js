const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = process.env;

exports.authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // Log the token for debugging
    console.log('Received Token:', token);

    if (!token) {
        console.log('Access denied: No token provided');
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Log the decoded payload for debugging
        console.log('Decoded Token:', decoded);

        req.user = await User.findById(decoded.id).select('-password');
        
        if (!req.user) {
            console.log('User not found for token:', decoded);
            return res.status(404).json({ error: 'User not found' });
        }
        
        next();
    } catch (error) {
        console.log('Invalid token:', error);
        res.status(400).json({ error: 'Invalid token' });
    }
};

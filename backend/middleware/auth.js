const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ message: 'Authentication token missing' });

    const token = authHeader.replace(/Bearer\s+/i, '').trim();
    if (!token) return res.status(401).json({ message: 'Authentication token missing' });

    const secret = process.env.JWT_SECRET || 'taskmanagertoken';
    const decoded = jwt.verify(token, secret);
    
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found or token invalid' });

    req.user = user;
    next();
  } catch (error) {
    const message = error.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token';
    res.status(401).json({ message });
  }
};

module.exports = auth;

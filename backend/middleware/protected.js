
const jwt = require('jsonwebtoken');

const protected = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'WAIT_LIST'); // Ensure you use the correct secret key
      req.user = decoded;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.role === "admin") {
    return res.status(403).json({ message: 'Not authorized, admin access required' });
  }
  next();
};

module.exports = {
  protected, // Renamed to avoid conflict with existing usage
  isAdmin,
};


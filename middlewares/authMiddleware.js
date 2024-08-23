const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === 'Bearer SecretToken') {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
  };
  
  module.exports = authMiddleware;
  
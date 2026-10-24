const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return res.status(401).json({ message: 'Authentication is required' });
  }

  try {
    req.user = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired access token' });
  }
}

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have permission to access this resource' });
    }

    return next();
  };
}

module.exports = { authenticate, authorizeRoles };

const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = localStorage.getItem('token') || req.cookies.token || req.headers['x-access-token'];
    console.log('Token from request:', token); // Debugging line
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }
    const refreshToken = localStorage.getItem('refreshToken') || req.cookies.refreshToken || req.headers['x-refresh-token'];
    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = decoded;
        const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        req.refreshUser = decodedRefresh;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token, authorization denied' });
    }
}

module.exports = authenticate;  
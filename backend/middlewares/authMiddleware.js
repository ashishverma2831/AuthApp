const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    console.log('Token from request:', accessToken); // Debugging line
    if (!accessToken) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided, authorization denied' });
    }
    console.log('Refresh Token from request:', refreshToken); // Debugging line
    console.log('Access Token from request:', accessToken); // Debugging line

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        console.log('Decoded token:', decoded); // Debugging line
        req.user = decoded;
        const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        req.refreshUser = decodedRefresh;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token,  jjjjjjjjjjjjjjjjjjjjjjjjj authorization denied' });
    }
}

module.exports = authenticate;  
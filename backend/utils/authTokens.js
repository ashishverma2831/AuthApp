const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_MAX_AGE = 60 * 60 * 1000;
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

function getCookieOptions(maxAge) {
  return {
    httpOnly: true,
    maxAge,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  };
}

function createTokens(user) {
  const payload = {
    id: user._id.toString(),
    role: user.role,
  };

  return {
    accessToken: jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' }),
    refreshToken: jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' }),
  };
}

function setAuthCookies(res, tokens) {
  res.cookie('accessToken', tokens.accessToken, getCookieOptions(ACCESS_TOKEN_MAX_AGE));
  res.cookie('refreshToken', tokens.refreshToken, getCookieOptions(REFRESH_TOKEN_MAX_AGE));
}

function clearAuthCookies(res) {
  const options = getCookieOptions(0);
  res.clearCookie('accessToken', options);
  res.clearCookie('refreshToken', options);
}

module.exports = {
  clearAuthCookies,
  createTokens,
  setAuthCookies,
};

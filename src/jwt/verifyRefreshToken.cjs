const jwt = require('jsonwebtoken');
const { JWT_REFRESH_SECRET } = require('../utils/env');

function verifyRefreshToken(token) {
  return jwt.verify(token, JWT_REFRESH_SECRET);
}

module.exports = { verifyRefreshToken };

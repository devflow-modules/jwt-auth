const jwt = require('jsonwebtoken');
const { JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES_IN } = require('../utils/env');

function signRefreshToken(payload, options = {}) {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
    ...options,
  });
}

module.exports = { signRefreshToken };

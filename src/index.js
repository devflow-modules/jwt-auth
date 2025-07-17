const { signToken } = require('./jwt/signToken');
const { verifyToken } = require('./jwt/verifyToken');
const { signRefreshToken } = require('./jwt/signRefreshToken');
const { verifyRefreshToken } = require('./jwt/verifyRefreshToken');

const { hashPassword } = require('./password/hashPassword');
const { comparePassword } = require('./password/comparePassword');

const { protectRoute } = require('./middleware/protectRoute');

module.exports = {
  signToken,
  verifyToken,
  signRefreshToken,
  verifyRefreshToken,
  hashPassword,
  comparePassword,
  protectRoute,
};

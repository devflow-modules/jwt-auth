// JWT: access/refresh token helpers
const { signToken } = require('./jwt/signToken.cjs');
const { verifyToken } = require('./jwt/verifyToken.cjs');
const { signRefreshToken } = require('./jwt/signRefreshToken.cjs');
const { verifyRefreshToken } = require('./jwt/verifyRefreshToken.cjs');

// Password helpers
const { hashPassword } = require('./password/hashPassword.cjs');
const { comparePassword } = require('./password/comparePassword.cjs');

// Express middlewares
const { protectRoute } = require('./middleware/protectRoute.cjs');
const { protectRouteFromCookie } = require('./middleware/protectRouteFromCookie.cjs');
const { protectWithRoles } = require('./middleware/protectWithRoles.cjs');

// Cookie helpers
const { setTokenCookie } = require('./cookies/setTokenCookie.cjs');
const { getTokenFromCookie } = require('./cookies/getTokenFromCookie.cjs');

/**
 * Public package API grouped by namespace.
 *
 * Example:
 *
 * const { jwt, password, middleware, cookies } = require('@devflow-modules/jwt-auth');
 * jwt.signToken(...)
 * password.hashPassword(...)
 * middleware.protectRoute(...)
 */

module.exports = {
  jwt: {
    signToken,
    verifyToken,
    signRefreshToken,
    verifyRefreshToken,
  },
  password: {
    hashPassword,
    comparePassword,
  },
  middleware: {
    protectRoute,
    protectRouteFromCookie,
    protectWithRoles,
  },
  cookies: {
    setTokenCookie,
    getTokenFromCookie,
  },
};

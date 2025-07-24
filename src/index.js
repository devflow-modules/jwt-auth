// JWT: Funções para geração e verificação de access/refresh tokens
const { signToken } = require('./jwt/signToken');
const { verifyToken } = require('./jwt/verifyToken');
const { signRefreshToken } = require('./jwt/signRefreshToken');
const { verifyRefreshToken } = require('./jwt/verifyRefreshToken');

// Senhas: Hash e comparação de senhas com bcrypt
const { hashPassword } = require('./password/hashPassword');
const { comparePassword } = require('./password/comparePassword');

// Middlewares: Proteção de rotas com verificação de token (Header ou Cookie)
const { protectRoute } = require('./middleware/protectRoute');
const { protectRouteFromCookie } = require('./middleware/protectRouteFromCookie');

// Cookies: Utilitários para manipulação de token via cookies HTTP-only
const { setTokenCookie } = require('./cookies/setTokenCookie');
const { getTokenFromCookie } = require('./cookies/getTokenFromCookie');

/**
 * Exporta as funcionalidades organizadas em namespaces.
 * Isso permite importar apenas o necessário com clareza:
 *
 *   const { jwt, password, middleware } = require('@devflow-modules/jwt-auth');
 *   jwt.signToken(...), password.hashPassword(...), middleware.protectRoute(...)
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
  },
  cookies: {
    setTokenCookie,
    getTokenFromCookie,
  },
};

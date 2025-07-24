const jwt = require('jsonwebtoken');
const { JWT_REFRESH_SECRET } = require('../utils/env');

/**
 * Verifica e decodifica um Refresh Token JWT.
 *
 * Este token geralmente é usado para renovar o Access Token
 * sem exigir novo login do usuário.
 *
 * @param {string} token - Token JWT a ser verificado.
 * @returns {Object} Payload decodificado do token.
 *
 * @throws {Error} Se o token for inválido, expirado ou o segredo não estiver definido.
 */
function verifyRefreshToken(token) {
  if (!JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET não definido. Verifique o arquivo .env.');
  }

  return jwt.verify(token, JWT_REFRESH_SECRET);
}

module.exports = { verifyRefreshToken };

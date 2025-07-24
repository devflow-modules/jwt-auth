const jwt = require('jsonwebtoken');
const { JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES_IN } = require('../utils/env');

/**
 * Gera um Refresh Token JWT.
 *
 * O Refresh Token permite renovar o Access Token quando ele expira,
 * sem exigir que o usuário faça login novamente.
 *
 * @param {Object} payload - Dados a serem codificados no token (ex: userId).
 * @param {Object} [options={}] - Opções adicionais para o jwt.sign().
 * @returns {string} Refresh Token assinado.
 *
 * @throws {Error} Se a variável JWT_REFRESH_SECRET não estiver definida.
 */
function signRefreshToken(payload, options = {}) {
  if (!JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET não definido. Verifique o arquivo .env.');
  }

  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
    ...options,
  });
}

module.exports = { signRefreshToken };

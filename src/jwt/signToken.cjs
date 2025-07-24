const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const {
  JWT_ALGORITHM = 'HS256',
  JWT_SECRET,
  JWT_EXPIRES_IN = '1h',
  JWT_PRIVATE_KEY_PATH,
} = require('../utils/env');

/**
 * Gera um Access Token JWT com suporte a algoritmos simétricos (HS256/HS512)
 * e assimétricos (RS256).
 *
 * @param {Object} payload - Objeto de dados a ser assinado no token.
 * @param {Object} options - Opções extras do JWT (ex: audience, issuer).
 * @returns {string} Token JWT assinado.
 *
 * @throws {Error} Se variáveis obrigatórias do algoritmo não estiverem definidas.
 */
function signToken(payload, options = {}) {
  const algorithm = JWT_ALGORITHM;
  let key;

  if (algorithm.startsWith('RS')) {
    // Algoritmo assimétrico requer chave privada
    if (!JWT_PRIVATE_KEY_PATH) {
      throw new Error('JWT_PRIVATE_KEY_PATH não definido para algoritmo RS256.');
    }

    try {
      key = fs.readFileSync(path.resolve(JWT_PRIVATE_KEY_PATH), 'utf-8');
    } catch (err) {
      throw new Error(`Erro ao ler JWT_PRIVATE_KEY_PATH: ${err.message}`);
    }
  } else {
    // Algoritmos simétricos requerem JWT_SECRET
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET não definido para algoritmos HS.');
    }

    key = JWT_SECRET;
  }

  return jwt.sign(payload, key, {
    algorithm,
    expiresIn: JWT_EXPIRES_IN,
    ...options,
  });
}

module.exports = { signToken };

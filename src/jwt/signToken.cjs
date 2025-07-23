const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const {
  JWT_ALGORITHM = 'HS256',
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_PRIVATE_KEY_PATH,
} = require('../utils/env');

/**
 * Assina um token JWT com suporte a HS256, HS512 ou RS256.
 */
function signToken(payload, options = {}) {
  const algorithm = JWT_ALGORITHM;
  let key;

  if (algorithm.startsWith('RS')) {
    // Algoritmo assimétrico (ex: RS256)
    const privatePath = JWT_PRIVATE_KEY_PATH;
    if (!privatePath) {
      throw new Error('JWT_PRIVATE_KEY_PATH não definido para algoritmo RS256.');
    }
    key = fs.readFileSync(path.resolve(privatePath), 'utf-8');
  } else {
    // Algoritmo simétrico (ex: HS256, HS512)
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

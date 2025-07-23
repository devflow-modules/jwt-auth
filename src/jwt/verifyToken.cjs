const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const {
  JWT_ALGORITHM = 'HS256',
  JWT_SECRET,
  JWT_PUBLIC_KEY_PATH,
} = require('../utils/env');

/**
 * Verifica um token JWT com suporte a HS256, HS512 ou RS256.
 */
function verifyToken(token, options = {}) {
  const algorithm = JWT_ALGORITHM;
  let key;

  if (algorithm.startsWith('RS')) {
    if (!JWT_PUBLIC_KEY_PATH) {
      throw new Error('JWT_PUBLIC_KEY_PATH não definido para algoritmo RS256.');
    }
    key = fs.readFileSync(path.resolve(JWT_PUBLIC_KEY_PATH), 'utf-8');
  } else {
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET não definido para algoritmos HS.');
    }
    key = JWT_SECRET;
  }

  return jwt.verify(token, key, {
    algorithms: [algorithm],
    ...options,
  });
}

module.exports = { verifyToken };

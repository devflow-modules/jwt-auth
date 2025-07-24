const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const {
  JWT_ALGORITHM = 'HS256',
  JWT_SECRET,
  JWT_PUBLIC_KEY_PATH,
} = require('../utils/env');

/**
 * Verifica e decodifica um token JWT com suporte a algoritmos simétricos e assimétricos.
 *
 * @param {string} token - Token JWT a ser verificado.
 * @param {Object} options - Opções adicionais de verificação (ex: audience, issuer).
 * @returns {Object} Payload decodificado.
 *
 * @throws {Error} Se variáveis obrigatórias não estiverem definidas ou o token for inválido.
 */
function verifyToken(token, options = {}) {
  const algorithm = JWT_ALGORITHM;
  let key;

  if (algorithm.startsWith('RS')) {
    // Algoritmo assimétrico requer chave pública
    if (!JWT_PUBLIC_KEY_PATH) {
      throw new Error('JWT_PUBLIC_KEY_PATH não definido para algoritmo RS256.');
    }

    try {
      key = fs.readFileSync(path.resolve(JWT_PUBLIC_KEY_PATH), 'utf-8');
    } catch (err) {
      throw new Error(`Erro ao ler JWT_PUBLIC_KEY_PATH: ${err.message}`);
    }
  } else {
    // Algoritmos simétricos requerem JWT_SECRET
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
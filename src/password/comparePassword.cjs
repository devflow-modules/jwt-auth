const bcrypt = require('bcryptjs');

/**
 * Compara uma senha em texto puro com seu hash usando bcrypt.
 *
 * Esta função é usada para validar se a senha fornecida pelo usuário
 * corresponde ao hash armazenado (gerado via `hashPassword`).
 *
 * @example
 * const isValid = await comparePassword('minhasenha', hashSalvo);
 * if (isValid) {
 *   // autenticar usuário
 * }
 *
 * @param {string} plainPassword - Senha em texto puro (entrada do usuário).
 * @param {string} hashedPassword - Hash armazenado da senha.
 * @returns {Promise<boolean>} - Retorna `true` se a senha for válida.
 */
async function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = { comparePassword };

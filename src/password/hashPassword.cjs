const bcrypt = require('bcryptjs');

/**
 * Gera um hash seguro para a senha fornecida usando bcrypt.
 *
 * Este método é utilizado no momento do cadastro ou atualização de senha,
 * armazenando o hash em vez da senha em texto puro.
 *
 * @example
 * const hash = await hashPassword('minhasenha123');
 * // Salve o hash no banco de dados (nunca salve a senha original!)
 *
 * @param {string} plainPassword - A senha original (texto puro).
 * @returns {Promise<string>} - Um hash criptografado da senha.
 */
async function hashPassword(plainPassword) {
  const salt = await bcrypt.genSalt(10); // Gera um salt com 10 rounds
  return bcrypt.hash(plainPassword, salt); // Retorna o hash gerado com o salt
}

module.exports = { hashPassword };

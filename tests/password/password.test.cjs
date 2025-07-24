// Importa o namespace `password`, que contém utilitários para hash e comparação de senhas
const { password } = require('../../src');

/**
 * Testes unitários para o módulo de senhas
 *
 * Este módulo utiliza `bcrypt` para:
 * - Gerar hashes seguros a partir de senhas em texto puro
 * - Comparar senhas fornecidas com hashes previamente armazenados
 */
describe('Password Hashing', () => {
  const plainPassword = 'senhaSegura123';

  it('deve gerar um hash válido para a senha', async () => {
    const hash = await password.hashPassword(plainPassword);

    // Verifica que o hash gerado é uma string
    expect(typeof hash).toBe('string');

    // Sanidade: o hash nunca deve ser igual à senha original
    expect(hash).not.toBe(plainPassword);
  });

  it('deve validar corretamente uma senha correta', async () => {
    const hash = await password.hashPassword(plainPassword);

    // Compara a mesma senha com o hash gerado
    const result = await password.comparePassword(plainPassword, hash);

    // Espera que a comparação retorne true
    expect(result).toBe(true);
  });

  it('deve retornar false para uma senha incorreta', async () => {
    const hash = await password.hashPassword(plainPassword);

    // Tenta comparar com uma senha incorreta
    const result = await password.comparePassword('senhaErrada', hash);

    // Espera que a verificação falhe
    expect(result).toBe(false);
  });
});

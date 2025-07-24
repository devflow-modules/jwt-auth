const path = require('path');

// Payload de exemplo para geração de token
const payload = { id: '123', email: 'teste@teste.com' };

/**
 * Testes unitários para a função signToken:
 * 
 * Esses testes validam os comportamentos esperados quando variáveis de ambiente
 * obrigatórias não estão definidas para algoritmos HS256 (simétrico) e RS256 (assimétrico).
 * 
 * Como as variáveis são lidas e congeladas via require no módulo `env.cjs`,
 * usamos `jest.mock` para sobrescrevê-las antes de importar `signToken`.
 */
describe('signToken - erros esperados', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Clona o ambiente atual antes de cada teste
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    // Restaura e limpa o cache do Jest após cada teste
    process.env = originalEnv;
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('deve lançar erro se JWT_SECRET não estiver definido para HS', () => {
    // Simula ambiente com algoritmo HS256 e sem JWT_SECRET
    jest.mock('../../src/utils/env.cjs', () => ({
      JWT_ALGORITHM: 'HS256',
      JWT_SECRET: undefined,
      JWT_EXPIRES_IN: '1h',
    }));

    // Reimporta a função após o mock
    const signToken = require(path.resolve(__dirname, '../../src/jwt/signToken.cjs')).signToken;

    // Espera erro explícito por ausência do JWT_SECRET
    expect(() => signToken(payload)).toThrow('JWT_SECRET não definido para algoritmos HS.');
  });

  it('deve lançar erro se JWT_PRIVATE_KEY_PATH não estiver definido para RS', () => {
    // Simula ambiente com algoritmo RS256 e sem JWT_PRIVATE_KEY_PATH
    jest.mock('../../src/utils/env.cjs', () => ({
      JWT_ALGORITHM: 'RS256',
      JWT_PRIVATE_KEY_PATH: undefined,
    }));

    const signToken = require(path.resolve(__dirname, '../../src/jwt/signToken.cjs')).signToken;

    expect(() => signToken(payload)).toThrow('JWT_PRIVATE_KEY_PATH não definido para algoritmo RS256.');
  });
});

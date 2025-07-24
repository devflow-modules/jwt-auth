const fs = require('fs');
const path = require('path');
const { jwt } = require('../../src/index');

/**
 * Testes de algoritmos JWT suportados (HS256, HS512, RS256)
 *
 * Este conjunto de testes cobre os cenários de assinatura e verificação de tokens JWT
 * utilizando algoritmos simétricos (HS*) e assimétrico (RS256), além de simular uma falha
 * por troca de chave/secret após o token já ter sido emitido.
 */

// Utilitário para definir múltiplas variáveis de ambiente rapidamente
function setEnvVars(vars) {
  for (const [key, value] of Object.entries(vars)) {
    process.env[key] = value;
  }
}

describe('JWT Algorithms', () => {
  const payload = { id: 'abc123', role: 'admin' };

  afterEach(() => {
    // Limpa variáveis de ambiente e cache do Jest entre os testes
    delete process.env.JWT_SECRET;
    delete process.env.JWT_ALGORITHM;
    delete process.env.JWT_PRIVATE_KEY_PATH;
    delete process.env.JWT_PUBLIC_KEY_PATH;
    delete process.env.JWT_EXPIRES_IN;
    jest.resetModules();
  });

  test('HS256 - algoritmo padrão (simétrico)', () => {
    setEnvVars({
      JWT_SECRET: 'my_hs256_secret',
      JWT_EXPIRES_IN: '1h',
      JWT_ALGORITHM: 'HS256',
    });

    const token = jwt.signToken(payload);
    const result = jwt.verifyToken(token);

    expect(result.id).toBe(payload.id);
    expect(result.role).toBe(payload.role);
  });

  test('HS512 - algoritmo simétrico alternativo', () => {
    setEnvVars({
      JWT_SECRET: 'my_hs512_secret',
      JWT_EXPIRES_IN: '1h',
      JWT_ALGORITHM: 'HS512',
    });

    const token = jwt.signToken(payload);
    const result = jwt.verifyToken(token);

    expect(result.id).toBe(payload.id);
    expect(result.role).toBe(payload.role);
  });

  test('RS256 - algoritmo assimétrico com chave pública/privada', () => {
    const privateKeyPath = path.resolve('src/keys/private.key');
    const publicKeyPath = path.resolve('src/keys/public.key');

    // Confirma que as chaves existem antes de prosseguir
    expect(fs.existsSync(privateKeyPath)).toBe(true);
    expect(fs.existsSync(publicKeyPath)).toBe(true);

    setEnvVars({
      JWT_ALGORITHM: 'RS256',
      JWT_EXPIRES_IN: '1h',
      JWT_PRIVATE_KEY_PATH: privateKeyPath,
      JWT_PUBLIC_KEY_PATH: publicKeyPath,
    });

    const token = jwt.signToken(payload);
    const result = jwt.verifyToken(token);

    expect(result.id).toBe(payload.id);
    expect(result.role).toBe(payload.role);
  });

  test('Falha ao verificar token com secret incorreto', () => {
    // Primeiro, gera token com um secret válido
    setEnvVars({
      JWT_SECRET: 'secretA',
      JWT_ALGORITHM: 'HS256',
      JWT_EXPIRES_IN: '1h',
    });

    const token = jwt.signToken(payload);

    // Altera o secret para simular ambiente inválido
    process.env.JWT_SECRET = 'wrong_secret';
    jest.resetModules();

    // Reimporta o módulo JWT com o novo secret (errado)
    const { jwt: jwtWithWrongSecret } = require('../../src/index');

    // Espera que a verificação falhe com o novo secret
    expect(() => jwtWithWrongSecret.verifyToken(token)).toThrow();
  });
});

// Importa o namespace `jwt` com funções de token principal e de refresh
const { jwt } = require('../../src');

/**
 * Testes unitários para Refresh Tokens JWT
 *
 * Este conjunto de testes valida a geração, verificação e comportamento
 * de tokens de "refresh" — usados para renovar o access token com segurança.
 */
describe('Refresh Token', () => {
  const payload = { id: 'user123', role: 'user' };

  it('deve gerar e verificar corretamente um refresh token', () => {
    // Gera um refresh token a partir do payload
    const refreshToken = jwt.signRefreshToken(payload);

    // Verifica e decodifica o token
    const decoded = jwt.verifyRefreshToken(refreshToken);

    // Garante que o conteúdo do payload está presente no token decodificado
    expect(decoded.id).toBe(payload.id);
    expect(decoded.role).toBe(payload.role);
  });

  it('deve lançar erro ao verificar um token inválido', () => {
    // Usa um token malformado e espera que a verificação falhe
    expect(() => {
      jwt.verifyRefreshToken('token-invalido');
    }).toThrow();
  });

  it('deve gerar tokens diferentes para payloads diferentes', () => {
    // Garante unicidade dos tokens gerados mesmo com payloads semelhantes
    const tokenA = jwt.signRefreshToken({ id: 'a' });
    const tokenB = jwt.signRefreshToken({ id: 'b' });

    // Os tokens não devem ser iguais
    expect(tokenA).not.toBe(tokenB);
  });

  it('deve lançar erro se o refresh token estiver expirado', async () => {
    // Gera um token com validade curta (1 segundo)
    const token = jwt.signRefreshToken(payload, { expiresIn: '1s' });

    // Espera mais que o tempo de expiração
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Espera que o erro seja "jwt expired"
    expect(() => jwt.verifyRefreshToken(token)).toThrow('jwt expired');
  });
});

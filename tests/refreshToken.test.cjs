const { signRefreshToken } = require('../src/jwt/signRefreshToken');
const { verifyRefreshToken } = require('../src/jwt/verifyRefreshToken');

describe('Refresh Token', () => {
  const payload = { id: 'user123', role: 'user' };

  it('deve gerar e verificar um refresh token corretamente', () => {
    const refreshToken = signRefreshToken(payload);
    const decoded = verifyRefreshToken(refreshToken);

    expect(decoded.id).toBe('user123');
    expect(decoded.role).toBe('user');
  });

  it('deve lançar erro ao verificar um token inválido', () => {
    expect(() => {
      verifyRefreshToken('token-invalido');
    }).toThrow();
  });

  it('deve gerar tokens diferentes para diferentes usuários', () => {
    const tokenA = signRefreshToken({ id: 'a' });
    const tokenB = signRefreshToken({ id: 'b' });

    expect(tokenA).not.toBe(tokenB);
  });
});

const { signToken } = require('../src/jwt/signToken');
const { verifyToken } = require('../src/jwt/verifyToken');

describe('JWT Token', () => {
  it('deve assinar e verificar um token corretamente', () => {
    const payload = { id: '123', role: 'admin' };
    const token = signToken(payload);

    const decoded = verifyToken(token);
    expect(decoded.id).toBe('123');
    expect(decoded.role).toBe('admin');
  });

  it('deve lançar erro com token inválido', () => {
    expect(() => {
      verifyToken('token-invalido');
    }).toThrow();
  });
});

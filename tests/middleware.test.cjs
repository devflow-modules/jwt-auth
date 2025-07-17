const { signToken } = require('../src/jwt/signToken');
const { protectRoute } = require('../src/middleware/protectRoute');

describe('Middleware protectRoute', () => {
  const userPayload = { id: 'abc123' };
  const token = signToken(userPayload);

  const createMock = (headers = {}) => ({
    headers,
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  });

  it('deve permitir acesso com token válido', () => {
    const req = createMock({ authorization: `Bearer ${token}` });
    const next = jest.fn();

    protectRoute(req, req, next);
    expect(req.user.id).toBe('abc123');
    expect(next).toHaveBeenCalled();
  });

  it('deve bloquear acesso sem token', () => {
    const req = createMock();
    const res = createMock();
    const next = jest.fn();

    protectRoute(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token não fornecido.' });
  });

  it('deve bloquear token inválido', () => {
    const req = createMock({ authorization: 'Bearer invalido' });
    const res = createMock();
    const next = jest.fn();

    protectRoute(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token inválido ou expirado.' });
  });
});

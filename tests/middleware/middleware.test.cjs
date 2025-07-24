// Importa os namespaces principais do módulo
// - jwt: geração e verificação de tokens
// - middleware: middlewares de proteção
const { jwt, middleware } = require('../../src');

/**
 * Testes unitários para o middleware `protectRoute`
 *
 * Esse middleware protege rotas com base na presença e validade do token JWT
 * enviado no header Authorization. Ele deve:
 *  - Permitir acesso se o token for válido
 *  - Bloquear acesso se o token estiver ausente
 *  - Bloquear acesso se o token for inválido
 */
describe('Middleware protectRoute', () => {
  // Simula um usuário válido
  const userPayload = { id: 'abc123' };

  // Gera um token válido usando o módulo jwt
  const token = jwt.signToken(userPayload);

  /**
   * Cria um objeto req mockado com headers personalizados
   * @param {object} headers - Headers customizados, como Authorization
   */
  const createMockReq = (headers = {}) => ({
    headers,
  });

  /**
   * Cria um objeto res mockado com métodos encadeáveis:
   * res.status().json()
   */
  const createMockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('deve permitir acesso com token válido', () => {
    const req = createMockReq({ authorization: `Bearer ${token}` });
    const res = createMockRes();
    const next = jest.fn();

    middleware.protectRoute(req, res, next);

    // Espera que o middleware adicione o `req.user`
    expect(req.user).toBeDefined();
    expect(req.user.id).toBe('abc123');

    // Espera que o fluxo continue
    expect(next).toHaveBeenCalled();
  });

  it('deve bloquear acesso sem token', () => {
    const req = createMockReq(); // sem Authorization
    const res = createMockRes();
    const next = jest.fn();

    middleware.protectRoute(req, res, next);

    // Espera resposta 401 com mensagem apropriada
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token não fornecido.' });

    // Garante que não avançou no fluxo
    expect(next).not.toHaveBeenCalled();
  });

  it('deve bloquear token inválido', () => {
    const req = createMockReq({ authorization: 'Bearer invalido' });
    const res = createMockRes();
    const next = jest.fn();

    middleware.protectRoute(req, res, next);

    // Espera resposta 401 com erro de token inválido
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token inválido ou expirado.' });

    // Garante que o middleware não prosseguiu
    expect(next).not.toHaveBeenCalled();
  });
});

// Importa o namespace `jwt`, que fornece funções para assinar e verificar tokens JWT
const { jwt } = require('../../src/index');

/**
 * Testes unitários para o módulo JWT
 *
 * Este módulo expõe funções para:
 * - Assinar payloads em tokens JWT (signToken)
 * - Verificar e decodificar tokens (verifyToken)
 */
describe('JWT Token', () => {
  it('deve assinar e verificar um token corretamente', () => {
    // Payload de exemplo
    const payload = { id: '123', role: 'admin' };

    // Gera um token assinado com o payload
    const token = jwt.signToken(payload);

    // Verifica e decodifica o token
    const decoded = jwt.verifyToken(token);

    // Espera que os dados do payload original estejam no token
    expect(decoded.id).toBe('123');
    expect(decoded.role).toBe('admin');
  });

  it('deve lançar erro com token inválido', () => {
    // Fornece um token malformado e espera que a verificação falhe
    expect(() => {
      jwt.verifyToken('token-invalido');
    }).toThrow();
  });
});

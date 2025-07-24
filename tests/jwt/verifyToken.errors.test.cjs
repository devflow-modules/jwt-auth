const path = require('path');
const request = require('supertest');
const express = require('express');

/**
 * Payload simulado representando um usuário autenticado.
 * Usado como base para gerar tokens nos testes.
 */
const userPayload = { id: 'abc123', email: 'teste@teste.com' };

/**
 * Cria uma aplicação Express com o middleware de proteção por cookie JWT.
 *
 * @param {Function} middleware - Middleware de autenticação a ser testado.
 * @returns {import('express').Express} Aplicação express pronta para requisições de teste.
 */
function setupAppWithMiddleware(middleware) {
  const app = express();
  app.use(require('cookie-parser')()); // Necessário para fazer parsing dos cookies
  app.use(middleware); // Aplica o middleware de autenticação

  // Rota protegida usada para validar comportamento do middleware
  app.get('/', (req, res) => {
    res.status(200).json({ user: req.user });
  });

  return app;
}

describe('Middleware protectRouteFromCookie', () => {
  let app;
  let signToken;

  beforeEach(() => {
    // Define variáveis de ambiente para autenticação simétrica
    process.env.JWT_SECRET = 'segredo123';
    process.env.JWT_ALGORITHM = 'HS256';

    jest.resetModules(); // Garante limpeza entre testes

    // Importa a função signToken diretamente do módulo
    signToken = require(path.resolve(__dirname, '../../src/jwt/signToken')).signToken;

    // Importa o middleware de proteção corretamente com destructuring
    const middleware = require(path.resolve(__dirname, '../../src/middleware/protectRouteFromCookie')).protectRouteFromCookie;

    // Cria app com middleware ativo
    app = setupAppWithMiddleware(middleware);
  });

  /**
   * Deve permitir acesso se um token válido estiver presente no cookie `jwt`.
   */
  it('deve permitir acesso com token válido no cookie', async () => {
    const token = signToken(userPayload); // Gera token válido

    const res = await request(app)
      .get('/')
      .set('Cookie', [`jwt=${token}`]); // Simula envio do token no cookie

    expect(res.statusCode).toBe(200); // Espera sucesso
    expect(res.body.user.id).toBe(userPayload.id); // Verifica se o payload foi recuperado
  });

  /**
   * Deve bloquear o acesso quando nenhum token estiver presente nos cookies.
   */
  it('deve bloquear acesso sem token', async () => {
    const res = await request(app).get('/');

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Token não fornecido no cookie.');
  });

  /**
   * Deve bloquear o acesso quando o token estiver presente mas for inválido.
   */
  it('deve bloquear acesso com token inválido', async () => {
    const res = await request(app)
      .get('/')
      .set('Cookie', [`jwt=token_invalido`]); // Token forjado

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Token inválido ou expirado.');
  });
});

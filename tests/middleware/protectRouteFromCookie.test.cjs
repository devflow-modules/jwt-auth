const path = require('path');
const request = require('supertest');
const express = require('express');

// Importa funções expostas pela lib
const { jwt, middleware } = require('../../src');

const userPayload = { id: 'abc123', email: 'teste@teste.com' };

/**
 * Cria uma aplicação Express com o middleware fornecido para testes.
 *
 * @param {Function} middlewareFunction - Middleware de proteção a ser testado.
 * @returns {import('express').Express} App Express configurado.
 */
function setupAppWithMiddleware(middlewareFunction) {
  const app = express();
  app.use(require('cookie-parser')()); // Faz parse dos cookies
  app.use(middlewareFunction); // Aplica o middleware que será testado

  // Rota protegida que retorna o req.user
  app.get('/', (req, res) => {
    res.status(200).json({ user: req.user });
  });

  return app;
}

describe('Middleware protectRouteFromCookie', () => {
  let app;

  beforeEach(() => {
    process.env.JWT_SECRET = 'segredo123';
    process.env.JWT_ALGORITHM = 'HS256';

    jest.resetModules();

    // Inicializa app com middleware ativo
    app = setupAppWithMiddleware(middleware.protectRouteFromCookie);
  });

  /**
   * Deve permitir acesso com token válido no cookie "jwt"
   */
  it('deve permitir acesso com token válido no cookie', async () => {
    const token = jwt.signToken(userPayload); // Gera token válido

    const res = await request(app)
      .get('/')
      .set('Cookie', [`jwt=${token}`]); // Corrigido: nome do cookie deve ser "jwt"

    expect(res.statusCode).toBe(200);
    expect(res.body.user.id).toBe(userPayload.id); // Confirma que req.user foi setado
  });

  /**
   * Deve bloquear acesso quando nenhum cookie estiver presente.
   */
  it('deve bloquear acesso sem token no cookie', async () => {
    const res = await request(app).get('/');

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Token não fornecido no cookie.');
  });

  /**
   * Deve bloquear acesso se o token presente for inválido.
   */
  it('deve bloquear token inválido no cookie', async () => {
    const res = await request(app)
      .get('/')
      .set('Cookie', ['jwt=token-invalido']); // Corrigido: nome do cookie deve ser "jwt"

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Token inválido ou expirado.');
  });
});

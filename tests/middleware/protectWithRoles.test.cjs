const express = require('express');
const request = require('supertest');
const { protectWithRoles } = require('../../src/middleware/protectWithRoles.cjs');

describe('protectWithRoles middleware', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    // Simula um middleware que preenche req.user
    app.use((req, res, next) => {
      req.user = req.headers['x-role']
        ? { role: req.headers['x-role'] }
        : undefined;
      next();
    });

    app.get('/admin', protectWithRoles(['admin']), (req, res) => {
      res.json({ acesso: 'permitido' });
    });
  });

  it('permite acesso se role estiver autorizada', async () => {
    const res = await request(app)
      .get('/admin')
      .set('x-role', 'admin');

    expect(res.statusCode).toBe(200);
    expect(res.body.acesso).toBe('permitido');
  });

  it('nega acesso se role não estiver na lista', async () => {
    const res = await request(app)
      .get('/admin')
      .set('x-role', 'user');

    expect(res.statusCode).toBe(403);
    expect(res.body.error).toMatch(/acesso negado: permissão insuficiente/i);
  });

  it('nega acesso se usuário não tiver role definida', async () => {
    const res = await request(app).get('/admin');
    expect(res.statusCode).toBe(403);
    expect(res.body.error).toMatch(/sem role definida/);
  });

  it('lança erro se lista de roles não for válida', () => {
    expect(() => protectWithRoles()).toThrow();
    expect(() => protectWithRoles('admin')).toThrow();
  });
});

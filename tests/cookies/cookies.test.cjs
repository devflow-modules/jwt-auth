const { cookies } = require('../../src/index');

describe('Cookie Helpers', () => {
  describe('setTokenCookie', () => {
    it('deve definir o cookie com os valores padrão', () => {
      const res = {
        cookie: jest.fn(),
      };

      cookies.setTokenCookie(res, 'meu_token');

      expect(res.cookie).toHaveBeenCalledWith(
        'jwt',
        'meu_token',
        expect.objectContaining({
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Lax',
          path: '/',
          maxAge: 3600 * 1000,
        })
      );
    });

    it('deve aceitar opções customizadas', () => {
      const res = {
        cookie: jest.fn(),
      };

      cookies.setTokenCookie(res, 'custom_token', {
        name: 'access_token',
        maxAge: 1800,
        sameSite: 'Strict',
        domain: 'example.com',
      });

      expect(res.cookie).toHaveBeenCalledWith(
        'access_token',
        'custom_token',
        expect.objectContaining({
          maxAge: 1800 * 1000,
          sameSite: 'Strict',
          domain: 'example.com',
        })
      );
    });
  });

  describe('getTokenFromCookie', () => {
    it('deve retornar o token do cookie padrão', () => {
      const req = {
        cookies: {
          jwt: 'token_abc',
        },
      };

      const token = cookies.getTokenFromCookie(req);
      expect(token).toBe('token_abc');
    });

    it('deve retornar o token de um cookie com nome customizado', () => {
      const req = {
        cookies: {
          my_token: 'custom_123',
        },
      };

      const token = cookies.getTokenFromCookie(req, 'my_token');
      expect(token).toBe('custom_123');
    });

    it('deve retornar null se não houver cookie', () => {
      const req = {}; // sem cookies
      expect(cookies.getTokenFromCookie(req)).toBeNull();
    });

    it('deve retornar null se o cookie existir mas estiver vazio', () => {
      const req = {
        cookies: {},
      };
      expect(cookies.getTokenFromCookie(req)).toBeNull();
    });
  });
});
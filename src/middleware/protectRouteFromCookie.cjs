const { verifyToken } = require('../jwt/verifyToken');
const { getTokenFromCookie } = require('../cookies/getTokenFromCookie');

/**
 * Middleware para proteger rotas autenticadas usando token JWT em cookies.
 *
 * Este middleware extrai o token do cookie `jwt`, verifica sua validade,
 * e injeta os dados decodificados no objeto `req.user`. Se o token estiver
 * ausente ou for inválido, a requisição é bloqueada com erro 401.
 *
 * Ideal para aplicações com sessões baseadas em cookies HTTP-only.
 *
 * @example
 * // Em uma rota Express
 * app.get('/private', protectRouteFromCookie, (req, res) => {
 *   res.json({ user: req.user });
 * });
 *
 * @param {import('express').Request} req - Objeto da requisição.
 * @param {import('express').Response} res - Objeto da resposta.
 * @param {import('express').NextFunction} next - Função para continuar o fluxo.
 */
function protectRouteFromCookie(req, res, next) {
  const token = getTokenFromCookie(req);

  // Verifica se o token existe no cookie
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido no cookie.' });
  }

  try {
    // Verifica a validade do token
    const decoded = verifyToken(token);
    req.user = decoded; // Anexa o payload ao request
    next(); // Permite acesso à rota protegida
  } catch {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
}

module.exports = { protectRouteFromCookie };

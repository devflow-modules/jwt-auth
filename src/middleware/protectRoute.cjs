const { verifyToken } = require('../jwt/verifyToken');

/**
 * Middleware para proteger rotas autenticadas.
 *
 * Este middleware valida o token JWT enviado no cabeçalho `Authorization`.
 * Se o token for válido, os dados decodificados serão anexados à `req.user`.
 * Caso contrário, a requisição é rejeitada com erro 401 (Unauthorized).
 *
 * @example
 * // Em uma rota Express
 * app.get('/private', protectRoute, (req, res) => {
 *   res.json({ user: req.user });
 * });
 *
 * @param {import('express').Request} req - Objeto da requisição Express.
 * @param {import('express').Response} res - Objeto da resposta Express.
 * @param {import('express').NextFunction} next - Função para continuar o fluxo.
 */
function protectRoute(req, res, next) {
  const authHeader = req.headers.authorization;

  // Verifica se o cabeçalho Authorization foi enviado corretamente
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verifica e decodifica o token
    const decoded = verifyToken(token);
    req.user = decoded; // Injeta payload no request
    next(); // Permite acesso à rota
  } catch {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
}

module.exports = { protectRoute };

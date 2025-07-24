/**
 * Middleware para proteger rotas baseado em roles (funções/permissões).
 *
 * Este middleware verifica se o usuário autenticado possui uma role
 * autorizada para acessar a rota. Caso contrário, retorna erro 403.
 * 
 * A role do usuário deve estar previamente definida em `req.user.role`,
 * normalmente por um middleware de autenticação JWT.
 * 
 * @param {string[]} allowedRoles - Array de roles permitidos (ex: ['admin', 'editor'])
 * @throws {Error} Caso `allowedRoles` não seja array de strings válido.
 * @returns {Function} Middleware Express para proteção de rotas.
 *
 * @example
 * // Permite acesso somente para usuários com role 'admin' ou 'editor'
 * app.get('/rota-protegida', protectWithRoles(['admin', 'editor']), (req, res) => {
 *   res.send('Acesso autorizado');
 * });
 */
function protectWithRoles(allowedRoles = []) {
  if (
    !Array.isArray(allowedRoles) ||
    allowedRoles.length === 0 ||
    !allowedRoles.every(role => typeof role === 'string' && role.trim() !== '')
  ) {
    throw new Error(
      '[protectWithRoles] A lista de roles permitidos deve ser um array de strings não vazias.'
    );
  }

  return (req, res, next) => {
    const user = req.user;

    // Validação se usuário e role existem
    if (!user || typeof user.role !== 'string') {
      return res.status(403).json({ error: 'Acesso negado: usuário sem role definida.' });
    }

    // Normaliza para evitar problemas de case ou espaços
    const normalizedRole = user.role.trim().toLowerCase();
    const normalizedAllowedRoles = allowedRoles.map(r => r.trim().toLowerCase());

    // Verifica se a role do usuário está autorizada
    if (!normalizedAllowedRoles.includes(normalizedRole)) {
      return res.status(403).json({ error: 'Acesso negado: permissão insuficiente.' });
    }

    // Role autorizada, permite acesso
    next();
  };
}

module.exports = { protectWithRoles };
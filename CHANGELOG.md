📆 Changelog

Todas as mudanças importantes neste projeto são documentadas aqui.

[v1.0.0] - 2025-07-17

✨ Adicionado

Geração de access token com JWT (signToken)

Verificação de access token (verifyToken)

Geração e verificação de refresh token (signRefreshToken, verifyRefreshToken)

Hash seguro de senha com bcrypt (hashPassword)

Comparação de senha (comparePassword)

Middleware protectRoute para proteger rotas Express com JWT

Suporte a configurações .env via dotenv

Testes automatizados com Jest para todos os módulos

Cobertura de testes 100% com npm run test:coverage

Proteção de git push com Husky e gancho pre-push

Estrutura modular (src/jwt, src/password, src/middleware, src/utils)

README.md com exemplos claros e instruções completas de uso


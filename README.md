🔐 @devflow-modules/jwt-auth

Módulo de autenticação JWT seguro, modular e reutilizável para aplicações Node.js.Inclui suporte completo a access token, refresh token, hash e verificação de senhas, middleware de proteção e testes com cobertura.

🚀 Instalação

npm install @devflow-modules/jwt-auth

Ou, para uso local com desenvolvimento:

npm link

📆 Variáveis de ambiente

Crie um arquivo .env com:

JWT\_SECRET=chave\_secreta\_access\_token

JWT\_EXPIRES\_IN=1h

JWT\_REFRESH\_SECRET=chave\_secreta\_refresh\_token

JWT\_REFRESH\_EXPIRES\_IN=7d

✅ Funcionalidades

🔐 JWT - Access Token

const { signToken, verifyToken } = require('@devflow-modules/jwt-auth');

const token = signToken({ id: '123', role: 'admin' });

const payload = verifyToken(token); // { id: '123', role: 'admin', iat, exp }

🔁 JWT - Refresh Token

const { signRefreshToken, verifyRefreshToken } = require('@devflow-modules/jwt-auth');

const refresh = signRefreshToken({ id: '123' });

const payload = verifyRefreshToken(refresh);

🔑 Senhas

const { hashPassword, comparePassword } = require('@devflow-modules/jwt-auth');

const hash = await hashPassword('minhasenha');

const isValid = await comparePassword('minhasenha', hash); // true ou false

🛡️ Middleware: protectRoute

Protege rotas Express contra acesso sem token válido.

const express = require('express');

const { protectRoute } = require('@devflow-modules/jwt-auth');

const app = express();

app.get('/private', protectRoute, (req, res) => {

res.json({ user: req.user });

});

🧪 Testes

Execute os testes com cobertura:

npm run test:coverage

💡 Pré-push protegido com Husky

Este repositório usa Husky para impedir git push com testes quebrados ou cobertura insuficiente.

🧱 Estrutura

src/

├── jwt/

│   ├── signToken.cjs

│   ├── verifyToken.cjs

│   ├── signRefreshToken.cjs

│   └── verifyRefreshToken.cjs

├── password/

│   ├── hashPassword.cjs

│   └── comparePassword.cjs

├── middleware/

│   └── protectRoute.cjs

├── utils/

│   └── env.cjs

├── index.js

tests/

├── jwt.test.cjs

├── refreshToken.test.cjs

├── password.test.cjs

├── middleware.test.cjs

📌 Roadmap

a fazer

⚖️ Licença

MIT © devflow-modules

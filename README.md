![CI](https://github.com/devflow-modules/jwt-auth/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/devflow-modules/jwt-auth/branch/main/graph/badge.svg)](https://codecov.io/gh/devflow-modules/jwt-auth)
[![npm version](https://img.shields.io/npm/v/@devflow-modules/jwt-auth)](https://www.npmjs.com/package/@devflow-modules/jwt-auth)

# 🔐 @devflow-modules/jwt-auth

Módulo de autenticação JWT seguro, modular e reutilizável para aplicações Node.js.

Inclui suporte completo a:

- ✅ **Access Token**
- 🔁 **Refresh Token**
- 🔑 **Hash e verificação de senhas**
- 🛡️ **Middleware de proteção de rotas**
- 🧪 **Testes com cobertura**
- 🚫 **Zero dependência de banco de dados**

---

## 🚀 Instalação

```bash
npm install @devflow-modules/jwt-auth
```

Ou, para uso local com desenvolvimento:

```bash
npm link
```

---

## 📆 Variáveis de ambiente

Crie um arquivo `.env` com:

```env
JWT_SECRET=chave_secreta_access_token
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=chave_secreta_refresh_token
JWT_REFRESH_EXPIRES_IN=7d
```

---

## ✅ Funcionalidades

### 🔐 Geração e Verificação de Access Token

```js
const { signToken, verifyToken } = require('@devflow-modules/jwt-auth');

const token = signToken({ id: '123', role: 'admin' });
const payload = verifyToken(token); 
// { id: '123', role: 'admin', iat, exp }
```

---

### 🔁 Geração e Verificação de Refresh Token

```js
const { signRefreshToken, verifyRefreshToken } = require('@devflow-modules/jwt-auth');

const refresh = signRefreshToken({ id: '123' });
const payload = verifyRefreshToken(refresh);
```

---

### 🔑 Hash e Verificação de Senhas

```js
const { hashPassword, comparePassword } = require('@devflow-modules/jwt-auth');

const hash = await hashPassword('minhasenha');
const isValid = await comparePassword('minhasenha', hash); // true ou false
```

---

### 🛡️ Middleware: `protectRoute` (Express)

Protege rotas de acesso não autenticado.

```js
const express = require('express');
const { protectRoute } = require('@devflow-modules/jwt-auth');

const app = express();

app.get('/private', protectRoute, (req, res) => {
  res.json({ user: req.user });
});
```

---

### 💻 Exemplo completo (Express)

```js
require('dotenv').config();
const express = require('express');
const {
  signToken,
  signRefreshToken,
  protectRoute
} = require('@devflow-modules/jwt-auth');

const app = express();
app.use(express.json());

app.post('/login', (req, res) => {
  const token = signToken({ id: 'user123' });
  const refresh = signRefreshToken({ id: 'user123' });
  res.json({ token, refresh });
});

app.get('/private', protectRoute, (req, res) => {
  res.json({ user: req.user });
});

app.listen(3000, () => console.log('API rodando em http://localhost:3000'));
```

---

## 🧪 Testes

Execute os testes com cobertura:

```bash
npm run test:coverage
```

---

## 💡 Pré-push protegido com Husky

Este repositório usa [Husky](https://typicode.github.io/husky) para impedir `git push` com testes quebrados ou cobertura insuficiente.

---

## 🧱 Estrutura

```
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
```

---

## 📌 Roadmap

- [ ] Suporte a múltiplos algoritmos JWT (HS512, RS256)
- [ ] Suporte a cookies HTTP-only
- [ ] Middleware para roles e permissões
- [ ] Changelog automatizado + GitHub Release
- [ ] Exemplo completo com autenticação + refresh
- [ ] Middleware opcional para rotas públicas
- [ ] Compatibilidade com ESM (import/export)
- [ ] Suporte a sessão baseada em token com blacklist
- [ ] Integração com login social (Google, GitHub)


---

## ⚖️ Licença

MIT © [devflow-modules](https://github.com/devflow-modules)

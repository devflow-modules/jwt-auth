# 🔐 @devflow-modules/jwt-auth

Módulo de autenticação JWT seguro, modular e reutilizável para aplicações Node.js. Inclui suporte completo a **access token**, **refresh token**, **hash e verificação de senhas**, **middleware de proteção** e **testes com cobertura**.

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

### 🔐 JWT - Access Token

```js
const { signToken, verifyToken } = require('@devflow-modules/jwt-auth');

const token = signToken({ id: '123', role: 'admin' });
const payload = verifyToken(token); // { id: '123', role: 'admin', iat, exp }
```

---

### 🔁 JWT - Refresh Token

```js
const { signRefreshToken, verifyRefreshToken } = require('@devflow-modules/jwt-auth');

const refresh = signRefreshToken({ id: '123' });
const payload = verifyRefreshToken(refresh);
```

---

### 🔑 Senhas

```js
const { hashPassword, comparePassword } = require('@devflow-modules/jwt-auth');

const hash = await hashPassword('minhasenha');
const isValid = await comparePassword('minhasenha', hash); // true ou false
```

---

### 🛡️ Middleware: `protectRoute`

Protege rotas Express contra acesso sem token válido.

```js
const express = require('express');
const { protectRoute } = require('@devflow-modules/jwt-auth');

const app = express();

app.get('/private', protectRoute, (req, res) => {
  res.json({ user: req.user });
});
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

_a fazer_

---

## ⚖️ Licença

MIT © [devflow-modules](https://github.com/devflow-modules)

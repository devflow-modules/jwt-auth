![CI](https://github.com/devflow-modules/jwt-auth/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/devflow-modules/jwt-auth/branch/main/graph/badge.svg)](https://codecov.io/gh/devflow-modules/jwt-auth)

# 🔐 @devflow-modules/jwt-auth

Módulo de autenticação JWT seguro, modular e reutilizável para aplicações Node.js. Inclui suporte completo a:

- ✅ **Access Token**
- 🔁 **Refresh Token**
- 🔑 **Hash e verificação de senhas**
- 🛡️ **Middleware de proteção de rotas**
- 🧪 **Testes com cobertura**

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

- [ ] Suporte a múltiplos algoritmos JWT  
- [ ] Rotas públicas configuráveis  
- [ ] Exemplo de uso com login/logout completo


---

## ⚖️ Licença

MIT © [devflow-modules](https://github.com/devflow-modules)

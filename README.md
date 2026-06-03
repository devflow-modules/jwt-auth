![CI](https://github.com/devflow-modules/jwt-auth/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/devflow-modules/jwt-auth/branch/main/graph/badge.svg)](https://codecov.io/gh/devflow-modules/jwt-auth)
[![npm version](https://img.shields.io/npm/v/@devflow-modules/jwt-auth)](https://www.npmjs.com/package/@devflow-modules/jwt-auth)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

# @devflow-modules/jwt-auth

Reusable JWT authentication package for Node.js and Express applications.

This package provides access tokens, refresh tokens, password hashing, route protection, role-based authorization and HttpOnly Cookie helpers without requiring a database dependency.

---

## Recruiter Summary

`@devflow-modules/jwt-auth` is a reusable authentication module created as part of the DevFlow Labs ecosystem.

It demonstrates package-oriented engineering, authentication fundamentals, middleware design, test coverage, CI/CD awareness and reusable API design for Node.js applications.

Best for evaluating:

- JWT authentication fundamentals
- Express middleware design
- Password hashing with bcrypt
- Refresh token flows
- Role-based authorization middleware
- Cookie-based authentication helpers
- Test coverage and package readiness

---

## Features

- Access token generation and verification
- Refresh token generation and verification
- Password hashing and comparison
- Express route protection middleware
- Role-based authorization middleware
- HttpOnly Cookie helpers
- Cookie-based protected route middleware
- Multiple JWT algorithms: HS256, HS512 and RS256
- No database dependency
- Jest test coverage
- CI, Codecov, npm and MIT license badges

---

## Runtime and Module Format

This package currently ships as **CommonJS**.

Use it with `require`:

```js
const { jwt, password, middleware, cookies } = require('@devflow-modules/jwt-auth');
```

Native ESM import/export compatibility is listed in the roadmap and should be treated as future work.

---

## Requirements

- Node.js >= 16
- npm >= 8

---

## Installation

```bash
npm install @devflow-modules/jwt-auth
```

For local development:

```bash
npm link
```

---

## Environment Variables

Create a `.env` file with:

```env
JWT_SECRET=your_access_token_secret
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRES_IN=7d
```

For algorithm configuration:

```env
JWT_ALGORITHM=HS256
```

For HS256 / HS512:

```env
JWT_SECRET=your_hmac_secret
```

For RS256:

```env
JWT_PRIVATE_KEY_PATH=src/keys/private.key
JWT_PUBLIC_KEY_PATH=src/keys/public.key
```

Generate RS256 keys:

```bash
openssl genrsa -out src/keys/private.key 2048
openssl rsa -in src/keys/private.key -pubout -out src/keys/public.key
```

---

## Public API Reference

The package exports grouped namespaces from `src/index.js`.

| Namespace | Function | Description |
|---|---|---|
| `jwt` | `signToken(payload, options)` | Creates an access token. |
| `jwt` | `verifyToken(token, options)` | Verifies an access token and returns the decoded payload. |
| `jwt` | `signRefreshToken(payload, options)` | Creates a refresh token. |
| `jwt` | `verifyRefreshToken(token)` | Verifies a refresh token and returns the decoded payload. |
| `password` | `hashPassword(password)` | Hashes a plain-text password using bcrypt. |
| `password` | `comparePassword(password, hash)` | Compares a plain-text password against a bcrypt hash. |
| `middleware` | `protectRoute` | Express middleware for Bearer-token protected routes. |
| `middleware` | `protectRouteFromCookie` | Express middleware for cookie-based protected routes. |
| `middleware` | `protectWithRoles(roles)` | Express middleware factory for role-based authorization. |
| `cookies` | `setTokenCookie(res, token, options)` | Sets a JWT token cookie. |
| `cookies` | `getTokenFromCookie(req, name)` | Reads a JWT token from cookies. |

---

## Usage

### Access Token

```js
const { jwt } = require('@devflow-modules/jwt-auth');

const token = jwt.signToken({ id: '123', role: 'admin' });
const payload = jwt.verifyToken(token);

console.log(payload.id);
```

### Refresh Token

```js
const { jwt } = require('@devflow-modules/jwt-auth');

const refresh = jwt.signRefreshToken({ id: '123' });
const payload = jwt.verifyRefreshToken(refresh);

console.log(payload.id);
```

### Password Hashing

```js
const { password } = require('@devflow-modules/jwt-auth');

const hash = await password.hashPassword('my-password');
const isValid = await password.comparePassword('my-password', hash);
```

### Express Protected Route

```js
const express = require('express');
const { middleware } = require('@devflow-modules/jwt-auth');

const app = express();

app.get('/private', middleware.protectRoute, (req, res) => {
  res.json({ user: req.user });
});
```

### Role-Based Route

```js
const express = require('express');
const { middleware } = require('@devflow-modules/jwt-auth');

const app = express();

app.get('/admin', middleware.protectWithRoles(['admin']), (req, res) => {
  res.json({ message: 'Admin access granted.' });
});
```

### Cookie Helpers

```js
const express = require('express');
const cookieParser = require('cookie-parser');
const { jwt, cookies, middleware } = require('@devflow-modules/jwt-auth');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post('/login', (req, res) => {
  const token = jwt.signToken({ id: 'user-123' });
  cookies.setTokenCookie(res, token);
  res.json({ ok: true });
});

app.get('/private', middleware.protectRouteFromCookie, (req, res) => {
  res.json({ user: req.user });
});
```

---

## Complete Express Refresh Example

A complete refresh-auth example is available at:

```text
examples/express-refresh-auth/server.cjs
```

It demonstrates:

- User login
- Password hashing and comparison
- Access token creation
- Refresh token creation
- Refresh endpoint
- Protected Bearer-token route
- Protected cookie-based route

---

## Testing

Run tests:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

---

## Pre-Push Protection

This repository uses Husky to help prevent broken pushes when tests or quality checks fail.

---

## Project Structure

```text
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
│   ├── protectRoute.cjs
│   ├── protectWithRoles.cjs
│   └── protectRouteFromCookie.cjs
├── cookies/
│   ├── setTokenCookie.cjs
│   └── getTokenFromCookie.cjs
├── utils/
│   └── env.cjs
├── index.js
tests/
├── cookies/
│   └── cookies.test.cjs
├── jwt/
│   ├── jwt.test.cjs
│   ├── jwtAlgorithm.test.cjs
│   ├── refreshToken.test.cjs
│   ├── signToken.errors.test.cjs
│   └── verifyToken.errors.test.cjs
├── middleware/
│   ├── middleware.test.cjs
│   ├── protectWithRoles.test.cjs
│   └── protectRouteFromCookie.test.cjs
├── password/
│   └── password.test.cjs
examples/
└── express-refresh-auth/
    └── server.cjs
```

---

## Roadmap

- [x] Support multiple JWT algorithms: HS512 and RS256
- [x] Support HttpOnly Cookies
- [x] Add and export role-based authorization middleware
- [x] Add automated changelog and GitHub Release workflow
- [x] Add complete Express authentication + refresh example
- [ ] Add optional middleware for public routes
- [ ] Add native ESM import/export compatibility
- [ ] Add token blacklist/session invalidation support
- [ ] Add social login integration examples

---

## Portfolio Value

This package shows the ability to extract a common authentication concern into a reusable module with documentation, tests, CI, package metadata and a clear API surface.

It is especially relevant for SaaS/backend projects that need JWT-based authentication without coupling the auth helpers to a specific database.

---

## License

MIT © [devflow-modules](https://github.com/devflow-modules)

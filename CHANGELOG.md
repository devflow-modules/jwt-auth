# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.1.0](https://github.com/devflow-modules/jwt-auth/compare/v1.0.4...v1.1.0) (2025-07-24)


### Features

* **roles-middleware:** adiciona middleware protectWithRoles para proteção por roles ([#9](https://github.com/devflow-modules/jwt-auth/issues/9)) ([3694ac2](https://github.com/devflow-modules/jwt-auth/commit/3694ac26e8784d3b7e209620cfb38aeb942065c4))


### Bug Fixes

* **ci:** corrige push no workflow de release usando token correto para evitar erro 403 ([22161e6](https://github.com/devflow-modules/jwt-auth/commit/22161e6864d835dc710275d99a04586d8ccf7469))
* **ci:** desabilitar verificação GPG no upload para Codecov ([fe23a5d](https://github.com/devflow-modules/jwt-auth/commit/fe23a5d7d0c29b706d91759b4fa6f231936b13e1))
* **release-publish:** corrige push usando token no workflow para evitar erro 403 ([35b7536](https://github.com/devflow-modules/jwt-auth/commit/35b7536969c3366e79f7a807b979c5db1f6dd5b4))
* **release:** corrigir push no workflow com token npm ([5e7beb0](https://github.com/devflow-modules/jwt-auth/commit/5e7beb0ea49add7a362411dc7cd6c1fc94e8d327))
* **release:** corrigir token npm e separar workflows de release e PR ([#15](https://github.com/devflow-modules/jwt-auth/issues/15)) ([b785ee7](https://github.com/devflow-modules/jwt-auth/commit/b785ee7641caa201b855eeb8f85f16f08cfa910c))
* **release:** corrigir token npm para publicação e separar workflows em release-create-pr e release-publish ([0036764](https://github.com/devflow-modules/jwt-auth/commit/0036764089675c178cea1371e2dd390f29a35082))
* **workflow:** ajusta release-publish.yml e release-create-pr.yml ([27aeeda](https://github.com/devflow-modules/jwt-auth/commit/27aeeda71343cf8357e73053043dbbd0d6af42bc))

### [1.0.4](https://github.com/devflow-modules/jwt-auth/compare/v1.0.1...v1.0.4) (2025-07-24)


### Features

* adiciona autenticação via cookie com middleware `protectRouteFromCookie` ([#8](https://github.com/devflow-modules/jwt-auth/issues/8)) ([e3a0d05](https://github.com/devflow-modules/jwt-auth/commit/e3a0d056451e6f3a060eaed20b165c60ad6c87cc))
* adiciona suporte a múltiplos algoritmos JWT (HS256, HS512, RS256) ([#7](https://github.com/devflow-modules/jwt-auth/issues/7)) ([0fbf61a](https://github.com/devflow-modules/jwt-auth/commit/0fbf61a45667b6d23f9021d1c9ea78267d0b3e3c))

### [1.0.3](https://github.com/devflow-modules/jwt-auth/compare/v1.0.1...v1.0.3) (2025-07-23)

### [1.0.2](https://github.com/devflow-modules/jwt-auth/compare/v1.0.1...v1.0.2) (2025-07-22)


### Features

* suporte a múltiplos algoritmos de assinatura ([8c159c0](https://github.com/devflow-modules/jwt-auth/commit/8c159c087eec5b6893cbe65d485223e30ed483e3))

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

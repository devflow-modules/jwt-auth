// Carrega variáveis de ambiente do arquivo `.env`
require('dotenv').config();

/**
 * Este módulo centraliza e exporta todas as variáveis de ambiente utilizadas
 * no sistema de autenticação JWT. Isso garante consistência e facilita testes
 * e mudanças de configuração.
 */

// 🔐 Segredo usado para assinar tokens JWT (algoritmos HS)
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

// ⏱ Tempo de expiração padrão para access tokens
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// ⚙️ Algoritmo padrão de assinatura (HS256, HS512, RS256, etc.)
const JWT_ALGORITHM = process.env.JWT_ALGORITHM || 'HS256';

// 📁 Caminho para chave privada (necessário se usar RS256)
const JWT_PRIVATE_KEY_PATH = process.env.JWT_PRIVATE_KEY_PATH || '';

// 📁 Caminho para chave pública (necessário se usar RS256)
const JWT_PUBLIC_KEY_PATH = process.env.JWT_PUBLIC_KEY_PATH || '';

// 🔁 Segredo usado para assinar tokens de refresh
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret';

// ⏱ Tempo de expiração dos tokens de refresh
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

// Exporta todas as variáveis de forma centralizada
module.exports = {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_ALGORITHM,
  JWT_PRIVATE_KEY_PATH,
  JWT_PUBLIC_KEY_PATH,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN,
};

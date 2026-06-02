require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const {
  jwt,
  password,
  middleware,
  cookies,
} = require('@devflow-modules/jwt-auth');

const app = express();
app.use(express.json());
app.use(cookieParser());

const users = new Map();

async function seedUser() {
  const passwordHash = await password.hashPassword('password123');

  users.set('demo@example.com', {
    id: 'user-123',
    email: 'demo@example.com',
    role: 'admin',
    passwordHash,
  });
}

app.post('/login', async (req, res) => {
  const { email, password: plainPassword } = req.body;
  const user = users.get(email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const isPasswordValid = await password.comparePassword(
    plainPassword,
    user.passwordHash
  );

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.signToken(payload);
  const refreshToken = jwt.signRefreshToken({ id: user.id });

  cookies.setTokenCookie(res, accessToken);

  return res.json({
    accessToken,
    refreshToken,
  });
});

app.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required.' });
  }

  try {
    const decoded = jwt.verifyRefreshToken(refreshToken);
    const accessToken = jwt.signToken({ id: decoded.id });

    return res.json({ accessToken });
  } catch {
    return res.status(401).json({ message: 'Invalid refresh token.' });
  }
});

app.get('/private-bearer', middleware.protectRoute, (req, res) => {
  return res.json({
    message: 'Bearer-token route access granted.',
    user: req.user,
  });
});

app.get('/private-cookie', middleware.protectRouteFromCookie, (req, res) => {
  return res.json({
    message: 'Cookie-based route access granted.',
    user: req.user,
  });
});

seedUser().then(() => {
  app.listen(3000, () => {
    console.log('Example API running at http://localhost:3000');
    console.log('Demo user: demo@example.com / password123');
  });
});

function setTokenCookie(res, token, options = {}) {
  const {
    name = 'jwt',
    maxAge = 3600,
    httpOnly = true,
    secure = process.env.NODE_ENV === 'production',
    sameSite = 'Lax',
    path = '/',
    domain, // novo opcional
  } = options;

  const cookieOptions = {
    maxAge: maxAge * 1000,
    httpOnly,
    secure,
    sameSite,
    path,
  };
  if (domain) cookieOptions.domain = domain;

  res.cookie(name, token, cookieOptions);
}


module.exports = { setTokenCookie };
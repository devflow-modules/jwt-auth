function getTokenFromCookie(req, name = 'jwt') {
    return req?.cookies?.[name] ?? null;
}

module.exports = { getTokenFromCookie };
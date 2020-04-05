const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const authConfig = {
  domain: process.env.DOMAIN,
  audience: process.env.IDENTIFIER,
};

module.exports = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"],
});

// DATABASE_URL=postgres://postgres:mobexample@localhost:5432/postgres

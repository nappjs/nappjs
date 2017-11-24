const Router = require("express").Router;
const jwt = require("jsonwebtoken");
const UnauthorizedError = require("./http-errors").UnauthorizedError;

const jwtSecret = process.env.JWT_SECRET;

const getPayload = (access_token, next) => {
  return async () => {
    if (!access_token) {
      throw new UnauthorizedError("Missing access token");
    }

    let payload = null;
    if (jwtSecret) {
      payload = jwt.verify(access_token, jwtSecret);
    } else {
      payload = jwt.decode(access_token);
    }
    if (!payload) {
      throw new UnauthorizedError("Invalid token");
    }
    return payload;
  };
};

module.exports = database => {
  let app = new Router();

  app.use((req, res, next) => {
    let access_token = req.headers.authorization || req.query.access_token;

    if (access_token) {
      access_token = access_token.replace("Bearer ", "");
    }

    req.jwt = {
      access_token,
      payload: getPayload(access_token)
    };

    next();
  });

  return app;
};

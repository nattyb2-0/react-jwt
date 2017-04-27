const { logIn, verifyUser } = require('../model/auth');
const logInRouter = require('express').Router();
const { createToken } = require('../lib/token');

// authenticates the login, and if true send a json token
logInRouter.post('/', logIn, (req, res) => {
  res.json({
    token: res.token,
    id: res.id || 'invalid'
  });
});

module.exports = logInRouter;

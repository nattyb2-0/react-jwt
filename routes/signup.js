const signUpRouter = require('express').Router();

//our middlewares for creating user and token
const { createUser } = require('../model/user');
const { createToken } = require('../lib/token');

signUpRouter.post('/', createUser, (req, res) => {
  res.status(200).json({
    token: res.token,
    id: res.id
  });
});

module.exports = signUpRouter;

const authRouter = require('express').Router();
const { verifyUser} = require('../model/auth');


authRouter.post('/verify', verifyUser, (req, res) => {
  res.json({
    token: res.token,
    id: res.id
  });
});

module.exports = authRouter;

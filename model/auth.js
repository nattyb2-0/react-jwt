

const { createToken } = require('../lib/token.js');
const bcrypt = require('bcryptjs');
const psql = require('../db/db.js');


function logIn(req, res, next) {
  const loginData = {
    username: req.body.username,
    password: req.body.password,
  };
  console.log(loginData);
    psql.any(`SELECT *
      FROM users
      WHERE username = '${loginData.username}';`)
      .then(data => {
        let dbUsers = data;
        if (!(Array.isArray(data))) {
          dbUsers = [data];
        }
        dbUsers.forEach((user) => {
          const matches = bcrypt.compareSync(loginData.password, user.password);
          if (matches) {
            console.log(user);
            res.id = user.id
            res.token = createToken(user.id)
            next();
          }
        })
        res.token = 'invalid';
        next();
      })
    .catch((error) => console.log(error));
  }

module.exports = {
  logIn
};

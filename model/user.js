const psql = require('../db/db.js');
const bcrypt = require('bcryptjs');
const { createToken } = require('../lib/token');

 // creates a new user object using form input
  function createUser(req, res, next) {
    const SALTROUNDS = 10;
    console.log(req.body);
    const userObject = {
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, SALTROUNDS)
    };
    psql.one(`INSERT INTO users ( username,email, password )
    VALUES ('${userObject.username}', '${userObject.email}','${userObject.password}') returning *;`)
    .then(result => {
      res.token = createToken(result);
      res.id = result.id;
      next();
    })
    .catch(error => console.log(error));
}

module.exports = {
  createUser,

};

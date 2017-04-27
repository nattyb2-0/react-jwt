const psql = require('../db/db.js');
const bcrypt = require('bcryptjs');
const { createToken } = require('../lib/token');

// creates a new user object using form input
  function createUser(req, res, next) {
    const SALTROUNDS = 10;
    console.log(req.body);
    const userObject = {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, SALTROUNDS)
    };
    psql.none(`INSERT INTO users ( username, password )
    VALUES ('${userObject.username}', '${userObject.password}');`)
    .catch(error => console.log(error));
    // then gets the newly created id from the db
    psql.one(`SELECT id
      FROM users
      WHERE username = $/username/
      AND password = $/password/;`, userObject)
      .then((result) => {
        console.log('this is result--->' +result.id);
        res.token = createToken(result);
        res.id = result.id;
        next();
      })
      .catch(error => next(error));
    };
module.exports = {
  createUser,

};

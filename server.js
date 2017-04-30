require('dotenv').config({ silent: true });
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');

const app = express();
const PORT = process.argv[2] || process.env.port || 3000;


//our routes
// authorization router to validate users
const signUpRouter = require('./routes/signup');
const loginRouter = require('./routes/login')




// set up some logging
app.use(logger('dev'));

// This will parse our playload from fetch which is sent as a JSON object
app.use(bodyParser.json());


//use our routes
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/signup', signUpRouter);
app.use('/login', loginRouter)


app.listen(PORT, () => { console.log('Wanderlust 🌍')});

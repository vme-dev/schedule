var express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
var path = require('path');
var mongoose = require('mongoose');
  
var app = express();
var bodyParser = require('body-parser');

var Router = require('./router/index.js');
var keys = require('./keys');


app.use('/', express.static(__dirname + '/build'));

var myLogger = function (req, res, next) {
  console.log(__dirname + req.path);
  console.log("___________ /\n",req);
  next();
};

app.use(bodyParser.json({ extended: true }));
app.use(myLogger);
app.use(
  session({
    secret: 'hghtyNN23h',
    store: new FileStore(),
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
require('./config-passport');
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(keys.mongoURI,{ useNewUrlParser: true })
	.then(() => console.log('MongoDB connected.'))
  .catch(err => console.log(err))
app.use(myLogger);
app.use('/api',Router);

app.get('/', (req, res) => {
  console.log(req.session);
  res.send('Hello World!');
});

app.post('/', function (req, res) {
  res.send('POST');
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user) {
    if (err) {
      return next(err);
    }
    console.log(req.params);
    if (!user) {
      return res.send('Укажите правильный email или пароль!');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/admin');
    });
  })(req, res, next);
});

const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect('/');
  }
};

app.get('/admin', auth, (req, res) => {
  res.send('Admin page!');
});

app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

app.listen(8000, () => console.log('Example app listening on port 8000!') );



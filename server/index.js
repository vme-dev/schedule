var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
  
var app = express();
var bodyParser = require('body-parser');

var Router = require('./router/index.js');
var keys = require('./keys');


app.use('/', express.static(__dirname + '/build'));

var myLogger = function (req, res, next) {
  console.log(__dirname + req.path);

  next();
};

app.use(myLogger);
app.use(bodyParser.json({
    extended: true
}));


mongoose.connect(keys.mongoURI,{ useNewUrlParser: true })
	.then(() => console.log('MongoDB connected.'))
  .catch(err => console.log(err))
app.use(myLogger);
app.use('/api',Router);

app.post('/', function (req, res) {
  res.send('POST');
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});
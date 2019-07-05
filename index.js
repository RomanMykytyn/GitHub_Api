var express = require('express');
var indexRouter = require('./routes/startPage');
var app = express();

app.use(express.static('public'));
app.use(express.static('dist'));
app.use('/', indexRouter);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!!!');
})

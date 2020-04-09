var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var log = require('./helpers/logger')();
var session = require('express-session')

var BooksModel = require('./models/Books');
var UsersModel = require('./models/Users');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var adminRouter = require('./routes/admin');

var app = express();
//Database Init
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/library', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, (err) => {
  if(err) log.err("An error occured while connecting the database. Err:" + err)
  else log.info("Database connection successfully started.");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const MongoStore = require('connect-mongo')(session);
const sessions = session({
  resave: false,
  saveUninitialized: false,
  secret: '2Q7CeLa"w@K7\\,T2',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  }),
});
app.use(sessions);
app.use(function(req,res,next){
  res.locals.session = req.session;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/admin', adminRouter);
app.use('/logout', (req, res) => {
  delete req.session.user;
  res.redirect('/');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

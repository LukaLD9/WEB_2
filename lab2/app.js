const createError = require('http-errors');
const path = require('path')
//const cookieParser = require('cookie-parser')
const express = require('express');
//const session = require('express-session')

const indexRouter = require('./routes/index');
const sqlRouter = require('./routes/sql');
const csrfRouter = require('./routes/csrf');

//express middleware setup
const app = express();

/*
//cookie-parsing middleware
app.use(cookieParser());
*/

//body content parsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//static content handling middleware
app.use(express.static(path.join(__dirname, 'public')));

/*
//session middleware (transient session records)
app.use(session({secret: 'FER WiM', resave: false, saveUninitialized: true}))
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routes 
app.use('/', indexRouter);
app.use('/sql', sqlRouter);
app.use('/csrf', csrfRouter);


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

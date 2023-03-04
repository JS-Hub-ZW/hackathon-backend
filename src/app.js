var express = require('express');
const mongoose = require("mongoose");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


const connectToDB = async () => {
    try {
        await mongoose.connect(
          process.env.MONGODB_URI
        );
       console.log("Connected Successully!")
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
}

connectToDB()

module.exports = app;

var express = require('express');
const mongoose = require("mongoose");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/events');

const seedDB = require('./seeder/seed');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/events', eventsRouter)



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

connectToDB().then(() => {
  if (process.argv[2] == 'with-seeds') {
    seedDB()
  }
})


module.exports = app;
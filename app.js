var express = require('express');
var path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
var cookieParser = require('cookie-parser');
const fileUpload = require("express-fileupload");
var logger = require('morgan');
dotenv.config();    // Load environment variables from .env file

require("./databases/mongodb");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');

var app = express();

// Middleware setup
app.use(logger('dev'));  // Middleware for logging HTTP requests
app.use(express.json());
app.set('trust proxy', true);
app.use(cors()); // Middleware to handle CORS
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '9mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static(__dirname + "/public"));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;

//imports
const express = require('express');
const path = require('path');

//importing dotenv configuration
require('dotenv').config()

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

//importing Mongoose
const mongoose = require("mongoose");


//importing Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const groceryRouter = require("./routes/grocery")


//Creating Mongo-db Connection to connect to database
mongoose.connect(
    process.env.MONGO_SERVER_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    function (err) {
        if (err) {
            console.log("err", err);
        } else {
            console.log("cconnected to DB successfully");
        }

    });

//instance of express
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/grocery", groceryRouter)

module.exports = app;

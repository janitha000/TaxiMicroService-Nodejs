'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var cors = require('cors');
var logger = require('./MIddleware/LoggerMiddleware');
const mongoose = require('mongoose');
const mongodb = require('./Data/Mongodb/mongodb')

var app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongodb.StartDbwithMongoose();






var routes = require('./Routes/routes');

app.use(logger);

app.use('/', routes);

module.exports = app;
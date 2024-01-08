const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const signupRoute = require('./app/user-module/services/user-signup');
const signinRoute = require('./app/user-module/services/user-signin');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user', [signupRoute, signinRoute]);
//app.use('/user', signinRoute);

module.exports = app;
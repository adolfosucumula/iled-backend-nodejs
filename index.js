const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const signupRoute = require('./app/user-module/services/user-signup');
const signinRoute = require('./app/user-module/services/user-signin');
const resetPasswordRoute = require('./app/user-module/services/forgot-password');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user', [signupRoute, signinRoute, resetPasswordRoute]);
//app.use('/user', signinRoute);
app.all('*', (require, response) => {
    console.log("Requested URL not found! Error 404.")
})

module.exports = app;
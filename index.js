const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const userRoute = require('./routes/user-routes');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user-routes', userRoute);

module.exports = app;
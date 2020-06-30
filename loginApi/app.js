const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { port } = require('./config/config');
const { loggerRouter, portLogger } = require('./middleware');
const jwt=require('jsonwebtoken');
const { router } = require('./src/authenticationRouter');
const dotenv = require('dotenv');
dotenv.config();



const app = express();
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(cors());

app.use(loggerRouter);
app.use('/auth', router);

app.listen(port,portLogger);

module.exports = app;
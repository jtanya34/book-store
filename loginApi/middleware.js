const express = require('express');
const { Logger,port } = require('./config/config');
const loggerRouter = express.Router();
var today=new Date();
var current_time=(`${today.getDate()}-${today.getMonth()}-${today.getFullYear()},${today.getHours()}`)
const jwt=require('jsonwebtoken');

loggerRouter.use((req, res, next) => {
  if (req.url !== '/favicon.ico') {
    Logger.info(`${current_time} Requested Page: ${req.url}`);
    next();
  }
});

const portLogger = (() => {
  Logger.info(`${current_time} Main Server running on port ${port}`);
});

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; 
  console.log(token,'lkjhg')

  if (token!=='null') {
    jwt.verify(token, process.env.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        console.log('asdf')
        return res.json({
          success: true,
          message: 'Auth successful'
        });
      }
    });
  } else {
   
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};




module.exports = {
  loggerRouter,
  portLogger,
  current_time,
  checkToken
};

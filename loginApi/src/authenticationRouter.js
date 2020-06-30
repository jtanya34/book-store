const express = require('express');
const controller = require('./authenticationController');
const router = express.Router();
const { Logger } = require('../config/config');
const { current_time,checkToken } = require('../middleware');
const jwt=require('jsonwebtoken');


router.post('/signup', async (req, res) => {
  Logger.info(`${current_time} Router: SignUp Process`);
  let result;
console.log(req.body.user)
  try {
      result = await controller.register(req.body.user);
      res.json(result)
  } catch (error) {
    Logger.error(`${current_time} Router: SignUp Process Error : ${error}`);
  }
});

router.post('/login', async (req, res) => {
  Logger.info(`${current_time} Router: SignIn Process`);

  try {
    const result = await controller.userLogin(req.body);
    if(result){
      let token = jwt.sign({email: req.body.email},
        process.env.secret,
        { expiresIn: '24h' // expires in 24 hours
        }
      );
      res.json({
        success: true,
        message: 'Authentication successful!',
        token: token,
        email:req.body.email,
        sellerId:req.body.sellerId
      });
    }
    
  } catch (error) {
    Logger.error(`${current_time} Router: Login Process Error : ${error}`);
  }
});


router.get('/checkToken', function(req, res) {
  let token = req.headers['x-access-token'] || req.headers['authorization']; 
  if (token!=='null') {
    jwt.verify(token, process.env.secret, (err, decoded) => {
      if (err) {
       res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
       res.json({
          success: true,
          message: 'Auth successful'
        });
      }
    });
  } else {
    res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
  
});


router.get('/books', async function(req, res) {
  Logger.info(`${current_time} Router: Fetch Books `);
  try {
    const result = await controller.getBooks();
    res.json(result)
  } catch (error) {
    Logger.error(`${current_time} Router: getBooks Process Error : ${error}`);
  }
});

router.get('/buybook/:id/:email', async function(req, res) {
  Logger.info(`${current_time} Router: Fetch Books `);
  try {
    const result = await controller.buyBook(req.params.id,req.params.email);
    res.json(result)
  } catch (error) {
    Logger.error(`${current_time} Router: getBooks Process Error : ${error}`);
  }
});

router.post('/addBook', async function(req, res) {
  Logger.info(`${current_time} Router: Add Book `);
  try {
    const result = await controller.addBook(req.body);
    res.json('success')
  } catch (error) {
    res.json('error')
    Logger.error(`${current_time} Router: getBooks Process Error : ${error}`);
  }
});

module.exports = {
  router,
};

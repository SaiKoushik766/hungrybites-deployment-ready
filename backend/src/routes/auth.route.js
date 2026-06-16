const express = require('express');
const authrouter =  express.Router();
const authcontroller = require('../controllers/auth.controller');
authrouter.post('/user/register',authcontroller.registeruser);
authrouter.post('/user/login',authcontroller.loginuser);
authrouter.get('/user/logout',authcontroller.logoutuser);
module.exports = authrouter;
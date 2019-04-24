var express = require('express');
var router = express.Router();
var User = require('../models/users');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var auth = require('../api/auth'); 
var userController = require('../controllers/userController'); 

router.post('/register', userController.userInscription);

router.post('/login', userController.userLogin);
/**/

//
module.exports = router;
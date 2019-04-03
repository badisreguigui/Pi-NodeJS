var express = require('express');
var router = express.Router();
var User = require('../models/users');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var auth = require('../api/auth');
var range=require('range');
const PredictionController = require('../controllers/prediction.js');



router.post('/',PredictionController.predict);



module.exports = router;
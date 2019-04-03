var express = require('express');
var router = express.Router();
var User = require('../models/users');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var auth = require('../api/auth');
var range=require('range');
const PredictionController = require('../controllers/prediction.js');
//
//Age + Awel karhba wallé + taille karhba + 9addeh andou men 3am isou9 + naw3 permis + naw3 el karhba(charika wala personnel)
//jét charika andha barcha kraheb 3andi / tchouf historique el kraheb mte3ha 


// LIST OF VARIABLES OF THE BINARY TREE 
var nodeAge = {left:range.range(15,24),center:range.range(25,64),right:range.range(65,90)};
var nodeAccident = {left:"Yes",right:"No"};
var nodeSalaire = {left:range.range(700,1000),center:range.range(1100,1500),right:range.range(1600,2200)};
var nodeMaladie = {left:"Yes",right:"No"};
var nodeNombreEnfant = {left:1,center:2,right:3};

router.post('/',PredictionController.predict);



module.exports = router;
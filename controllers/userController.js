var User = require('../models/users');
var express = require('express');
var router = express.Router();
var User = require('../models/users');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var auth = require('../api/auth'); 
var AIController = require('../controllers/AIAgentController'); 
var connectedUser=null;
exports.userInscription = function(req, res) {
    var user = new User({
        password: bcrypt.hashSync(/*req.body.password*/"123456", bcrypt.genSaltSync(10)),
        //email: req.body.email, 
        name: "FediBn",
        address: req.body.address, 
        phone: req.body.phone,
        vehiculeModel: req.body.vehiculeModel,
        numberOfOpenClaims: 0,
        monthsSinceLastClaim: 0
    })
    
    user.save(function (err, todo) {
        if (err)
            res.send(err);
        else
            res.send(user);
    })
}

exports.userLogin = async function (req) 
{
    return new Promise(resolve => {
        User.findOne({ name: req.name},function (err, user) {
            if (bcrypt.compareSync(req.password, user.password)) {
                console.log('Welcome to your account '+ user.name, '. How can I assist you?');
                //var token = jwt.sign({email: user.email}, 's3cr3t', {expiresIn: 3600});
               // res.status(200).json(user);
                connectedUser=user;
                module.exports.connectedUser=connectedUser;
                return resolve(user);
            } else {
                console.log('Please retry to login'); 
                //es.status(401).json('unauthorized');
                return resolve(null);
            }
        });
    }); 
}
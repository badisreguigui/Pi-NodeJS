var DecisionTree = require('decision-tree');
var MLR =require( 'ml-regression-multivariate-linear');

var dt = require('node-decision-tree');

const csv = require('csv-parser');  
var fs = require("fs");
var twilio = require('twilio');
const userController=require('../api/users');
const dossierController=require('../controllers/dossierInscriptionsController');
exports.predict = function (req, res) {

    var train = [];
    var predict=[];
    var test_data=[];
    
    listInterdictions=JSON.parse(fs.readFileSync('data.json'));
    for(var i=6; i<9; i++)
    {
        
        var x= { Gender:listInterdictions[i]['Gender'], VehicleClass: listInterdictions[i]['VehicleClass'], VehicleSize: listInterdictions[i]['VehicleSize'], EmploymentStatus: listInterdictions[i]['EmploymentStatus'],Policy:listInterdictions[i]['Policy'] };
           test_data.push(x);

    }

    for(var i=0; i<8; i++)
    {
        var x= { Gender:listInterdictions[i]['Gender'], VehicleClass: listInterdictions[i]['VehicleClass'], VehicleSize: listInterdictions[i]['VehicleSize'], EmploymentStatus: listInterdictions[i]['EmploymentStatus'],Policy:listInterdictions[i]['Policy'] };
        train.push(x);
       
    }
    var userInfo=
        { Gender:req.body.Gender, VehicleClass:req.body.VehicleClass, VehicleSize:req.body.VehicleSize, EmploymentStatus:req.body.EmploymentStatus};
    predict.push(userInfo);

    var features  = ['Gender', 'VehicleClass', 'VehicleSize','EmploymentStatus'];

    var class_name  = "Policy";

    var dt = new DecisionTree(train, class_name, features);

    var predicted_class = dt.predict({
    Gender:req.body.Gender,
    VehicleClass:req.body.VehicleClass,
    VehicleSize:req.body.VehicleSize,
    EmploymentStatus:req.body.EmploymentStatus

    });
    var accuracy = dt.evaluate(test_data);
 
//console.log(userController.connectedUser);
/*
    var accountSid = 'ACa899e4a1f35c565adfb6ac532b112666'; // Your Account SID from www.twilio.com/console
    var authToken = 'ce807b877d8d9caa4ee54987796b0bac';   // Your Auth Token from www.twilio.com/console
    
    
    var client = new twilio(accountSid, authToken);
    
    client.messages.create({
        body: 'Your Policy has been succefully created ',
        to: '+21625853072',  // Text this number
        from: '+15679984339' // From a valid Twilio number
    })
    */

  res.send(predicted_class);
    }
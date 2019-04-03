var DecisionTree = require('decision-tree');
var MLR =require( 'ml-regression-multivariate-linear');

var dt = require('node-decision-tree');

const csv = require('csv-parser');  
var fs = require("fs");

exports.predict = function (req, res) {

    var train = [];
    var predict=[];
    var test_data=[];
    
    listInterdictions=JSON.parse(fs.readFileSync('AutoDATA.json'));
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
    var accuracy = dt.evluate(test_data);
console.log(listInterdictions);
  res.send(predicted_class);
    }
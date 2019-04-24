var Accident = require('../models/Accident');
var Claim = require('../models/Claim');
var User = require('../models/users');


function ajoutAccident(accident) {
    
}

exports.test = async (req, res) => {
    let user = await findUser("5c9fefb42108dc2fc8b2791b");
    var accident = new Accident({
        address: req.address
    })
    
    accident.save(function (err, todo) {
        if (err)
            res.send(err);
        else
            res.send(accident);
    })
}

exports.ajouterAccident = async (userId, req) => {
    var date = req.dateTime;
    //let user = await findUser(userId);

    var accident = new Accident({
        dateTime: date,
        user: userId, //user._id,
        address: req.address,
        yourDirection: req.yourDirection,
        otherDirection: req.otherDirection,
        description: req.description,
        drivingConditions: req.drivingConditions,
        weather: req.weather,
        visibility: req.visibility, 
        witnessName: req.witnessName, 
        witnessContact: req.witnessContact, 
        namePoliceOfficer: req.namePoliceOfficer, 
        badgePoliceOfficer: req.badgePoliceOfficer, 
        policeOfficerContact: req.policeOfficerContact
    })

    accident.save(function (err, todo) {
            console.log("Your accident info has been added to the database")
    })

}

async function findAccident(id) {
    return new Promise(resolve => {
        Accident.findById(id, function (err, accident) {
            return resolve(accident)
        });
    });
   
}

async function findUser(id) {
    return new Promise(resolve => {
        User.findById(id, function (err, user) {
            return resolve(user)
        });
    });  
}

exports.ajouterClaim = async (user, req, res) => {
    let accident = await findAccident("5ca69ff7600f452ca0a37939"); 
    console.log(user.name); 
    var date = Date.now(); 
    var dateClaim = Date(date); 
    
    var difference = dateClaim - accident.dateTime; 
    const TOTAL_MILLISECONDS_IN_A_WEEK = 1000 * 60 * 24 * 7;

    if (Math.floor(difference / TOTAL_MILLISECONDS_IN_A_WEEK) >= 14) {
        console.log("The accident happened +14 days before the claim"); 
    }

    var claim = new Claim({
        user: user.id, 
        dateClaim: dateClaim, 
        accident: accident._id,
        driverName: user.name,
        driverAddress: user.address, 
        driverPhone: req.phone,
        otherInsuranceName: req.otherInsuranceName,
        otherInsurancePolicyNumber: req.otherInsurancePolicyNumber,
        otherVehiculeModel: req.otherVehiculeModel, 
        otherVehiculeYear: req.otherVehiculeYear,
        otherVehiculeRegistration: req.otherVehiculeRegistration, 
        otherVehiculeLicencePlate: req.otherVehiculeLicencePlate,
        progress: 'in progress'
    })

    claim.save(function (err, todo) {
            console.log('Your claim has been saved')
    })

    //User.findByIdAndUpdate()
}

exports.findAccident = function (req, res) {
    Accident.findById(req.params.id, function (err, accident) {
        if (err) return next(err);
        res.send(accident);
    })
}


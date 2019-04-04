var mongoose=require('mongoose');
var Accident = require('../models/Accident');

var ClaimSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dateClaim: Date, 
    accident:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accident'
    },
    driverName: String,
    driverAddress: String, 
    driverPhone: String,
    otherInsuranceName: String,
    otherInsurancePolicyNumber: String,
    otherVehiculeModel: String, 
    otherVehiculeYear: String,
    img: { type : Array , "default" : [] },
    otherVehiculeRegistration: String, 
    otherVehiculeLicencePlate: String, 
    damageEstimation:{type: Number,},
    progress: String
})

module.exports=mongoose.model('Claim',ClaimSchema);	

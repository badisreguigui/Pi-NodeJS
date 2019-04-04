var mongoose=require('mongoose');

var AccidentSchema = new mongoose.Schema({
    dateTime: Date,
    address: String, 
    yourDirection: String,
    otherDirection: String,
    description: String,
    imgs: { type : Array , "default" : [] },
    drivingConditions: String,
    weather: String,
    visibility: String, 
    witnessName: String, 
    witnessContact: String, 
    namePoliceOfficer: String, 
    badgePoliceOfficer: String, 
    policeOfficerContact: String, 
    injury: String
})

module.exports=mongoose.model('Accident',AccidentSchema);	
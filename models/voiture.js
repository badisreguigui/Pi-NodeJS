var mongoose = require('mongoose');


var voitureSchema = new mongoose.Schema({
    matricule :  { type : String , required : true},
    marque : {type: String ,default: null},
    model : {type : String ,default: null},
    cv : {type : Number ,default: null},
    energie : {type : String ,default: null},
    carosserie : {type : Number ,default: null},
    dateAchat : {type : Date ,default: null},
    miseCirculation : {type : Date ,default: null},
    appellation : {type : String ,default: null},

});
module.exports = mongoose.model('Voiture',voitureSchema);
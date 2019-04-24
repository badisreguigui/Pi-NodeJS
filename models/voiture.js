var mongoose = require('mongoose');


var voitureSchema = new mongoose.Schema({
    matricule :  { type : String },
    marque : {type: String ,default: null},
    model : {type : String ,default: null},
    cv : {type : Number ,default: null},
    energie : {type : String ,default: null},
    carosserie : {type : Number ,default: null},
    dateAchat : {type : Date ,default: null},
    miseCirculation : {type : Date ,default: null},
    appellation : {type : String ,default: null},
    kilometrage : Number,
});
module.exports = mongoose.model('Voiture',voitureSchema);
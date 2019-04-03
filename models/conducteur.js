var mongoose = require('mongoose');


var conducteurSchema = new mongoose.Schema({
    nom : {type : String ,default: null},
    prenom : {type : String ,default: null},
    age : {type : Number ,default: null},
    numeroTel : {type : Number ,default: null},
    situation :  { type : String , required : true},
    dateNaissance : {type: Date ,default: Date.now},
    dateObtentionDuPermis : {type : Date ,default: Date.now},
    mail : {type : String ,default: null},
    dossierInscription : {type: mongoose.Schema.Types.ObjectId , ref: 'DossierInscription', default : null}

});
module.exports = mongoose.model('Conducteur',conducteurSchema);
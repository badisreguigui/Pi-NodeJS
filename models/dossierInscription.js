var mongoose = require('mongoose');



const DureeAssurance = 
{
    TRIMSETRE : 'TRIMESTRE',
    SEMESTRE  : 'SEMESTRE',
    ANNUEL : 'ANNUEL'
};

var dossierInscriptionSchema = new mongoose.Schema({
    conducteur :  { type: mongoose.Schema.Types.ObjectId , ref: 'Conducteur', default : null},
    vehicule : {type: mongoose.Schema.Types.ObjectId , ref: 'Voiture' ,default: null},
    stationnement : {type: mongoose.Schema.Types.ObjectId , ref: 'Stationnement' ,default: null},
    garantie : {type: mongoose.Schema.Types.ObjectId , ref: 'Garantie' ,default: null},
    dureeAsurance : {type: DureeAssurance ,default: null},
});
module.exports = mongoose.model('DossierInscription',dossierInscriptionSchema);
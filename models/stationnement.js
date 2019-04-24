var mongoose = require('mongoose');

const TypeStationnement = {
    PARKING : 'PARKING',
    VOIE_PUBLIQUE: 'VOIE_PUBLIQUE',
    GARAGE : 'GARAGE'

};

const TypeDeplacement = {
    PRIVE : 'PRIVE',
    TRAVAIL : 'TRAVAIL'
};

var stationnementSchema = new mongoose.Schema({
    codePostal :  { type : Number},
    ville : {type: String ,default: null},
    tStationnement : {type : TypeStationnement ,default: null},
    tDeplacement : {type : TypeDeplacement ,default: null},
    
});
module.exports = mongoose.model('Stationnement',stationnementSchema);
var mongoose = require('mongoose');


var garantieSchema = new mongoose.Schema({
    vol :  { type : Boolean , default : false},
    incendie : {type: Boolean ,default: false},
    dommageVehicule: {type : Boolean ,default: false},
    securitePassagers : {type : Boolean ,default: false},
    brisDeGlace : {type : Boolean ,default: false},
    volPosteRadio : {type : Boolean ,default: false},
    nature : {type : Boolean ,default: false},
    assistanceAuto : {type : Boolean ,default: false}
});

module.exports = mongoose.model('Garantie',garantieSchema);
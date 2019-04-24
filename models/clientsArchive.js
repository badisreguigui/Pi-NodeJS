var mongoose = require('mongoose');
var clientArchiveSchema = new  mongoose.Schema({
    nom:{type: String, required: true, minLength:1, trim: true},
    idClient:{type: String, required: true, minLength:1, trim: true},    
    typeAssurance:{type: String, required: true,minLength:1, trim: true},
    etatPayment:{type: Number},
    etatClient:{type: Number},
})
module.exports = mongoose.model('ClientsArchive', clientArchiveSchema);/
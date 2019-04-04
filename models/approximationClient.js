var mongoose = require('mongoose');
var approximationClientSchema = new  mongoose.Schema({
    idClient:{type: String, required: true, minLength:1, trim: true},
    idClaim:{type: String, minLength:1, trim: true},
    totalApprox:{type: Number, },
    datePaymentClaimInsurance:{type: Date, trim: true},
})
module.exports = mongoose.model('approxClient', approximationClientSchema);
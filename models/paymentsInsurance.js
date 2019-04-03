var mongoose = require('mongoose');
var paymentClientSchema = new  mongoose.Schema({

    idClient:{type: String, required: true, minLength:1, trim: true},
    totalPayed:{type: Number, required: true,},
    paymentType:{type: Number, required: true,},
    datePaymentStart:{type: Date, trim: true},
    datePaymentEnd:{type: Date, trim: true},
    paymentId:{type: String, },
    etat:{type: Number,},
})
module.exports = mongoose.model('paymentClient', paymentClientSchema);
var mongoose = require('mongoose');


var insuranceContratSchema = new mongoose.Schema({
    policyholder:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    insuranceCompanyName:{type:String,default:"SFM Telecom"},
    insuranceCompanyAddress:{type:String,default:"8, Rue Ibn Sina - El Menzah VI 1004 - Tunis"},
    insuranceCompanyNumber:{type:String,default:"(+216) 71 845 248"},
    insuranceCompanyFax:{type:String,default:"(+216) 71 845 249"},
    insuranceCompanyMail:{type:String,default:"info@sfmtelecom.com"},
    insurancePrice:{type:Number,default:null},
    policyStartDate:{type:Date,default:new Date()},
    policyEndDate:{type:Date,required:true},
    insuranceCoverages:[String],
    deductible:{type:Number,default:null}
});

module.exports = mongoose.model('InsuranceContract',insuranceContratSchema);
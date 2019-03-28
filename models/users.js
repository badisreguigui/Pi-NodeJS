var mongoose=require('mongoose');
var valide=require('validator');
var userSchema=new mongoose.Schema
({
email: {type: String , required: true , trim:true , minLength: 1 , unique: true,
	   validate: {
        validator:valide.isEmail,
            message: '{VALUE} is not a valid email'
        }},
password:{type:String,required:true,minglength:6}
})

module.exports=mongoose.model('User',userSchema);	
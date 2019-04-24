var mongoose=require('mongoose');

var MessageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dateSent: Date, 
    file: { type : Array , "default" : [] },
    msgBody: String, 
    author: String
})

module.exports=mongoose.model('Message', MessageSchema);	

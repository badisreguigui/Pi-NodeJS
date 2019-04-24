var mongoose=require('mongoose');

var DiscussionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    nameDiscuss: String,
    lastMsg: String,
    img:String 
})

module.exports=mongoose.model('Discussion', DiscussionSchema);	/

var mongoose = require('mongoose');
var User=require('../models/users');

var messageSchema = new mongoose.Schema({
    msg :  { type : String , default : false},
    sentDate : {type: Date ,default:new Date()},
    senderId:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
});

module.exports = mongoose.model('Message',messageSchema);
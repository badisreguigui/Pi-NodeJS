var Accident = require('../models/Accident');
var Claim = require('../models/Claim');
var User = require('../models/users');
var Message = require('../models/Message');
var Discussion = require('../models/Discussion')

/////
exports.addMsg = (user, messageBody, author) => {
    console.log(user.id);
    var date = Date.now(); 
    var dateClaim = Date(date); 

   
    Discussion.findOneAndUpdate({user: ObjectId(user.id)}, {$set:{lastMsg:messageBody}}).then((data) => {
            if(data == null) {
                console.log("discuss added")
                addDiscussion(user, messageBody);
            } else {
                console.log("discussion updated")
            }

        })
        
    var message = new Message({
        user: ObjectId(user.id), 
        dateSent: dateClaim, 
        msgBody: messageBody,
        author: author
    })

    message.save(function (err, todo) {
        console.log('Your msg has been saved')
    })
}

exports.listMsgs = async (req, res) => {
    Message.find({user: ObjectId(req.query.id)}, function(err, msgs) {
        //return {msgs: msgs};
        console.log(msgs)
        res.send(msgs);
     });
}

exports.listDiscussions = async (req, res) => {
    Discussion.find({}, function(err, discussions) {
        console.log(discussions);
        res.send(discussions)
     });
}

function addDiscussion(user, msgBody) {
    const imgProfile = './img/no-photo.png'
    var discussion = new Discussion({
        user: ObjectId(user.id), 
        nameDiscuss: user.name,
        lastMsg: msgBody,
        img: imgProfile
    })

    discussion.save(function (err, todo) {
        console.log('Your discuss has been saved')
    })
}
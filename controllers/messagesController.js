var Message = require('../models/messages');

exports.sendMessage = function (req, res)
{
    var message = new Message(req.body);
    
      message.save(function (err,todo) {
        if(err)
            res.send(err);
        else
            res.send(todo);
    })
}

exports.myMessages = function (req, res){
    Message.find(function (err,listMessages) {
        if(err)
            res.send(err);
        if(!listMessages)
            res.status(404).send();
        else
            res.json(listMessages);

    })
}
var Claim = require('../models/Claim');

exports.ajouterClaim = function (req, res){
    var conducteur = new Claim(req.body);
    conducteur.save(function (err,todo) {
        if(err)
            res.send(err);
        else
            res.send(todo);
    })
}
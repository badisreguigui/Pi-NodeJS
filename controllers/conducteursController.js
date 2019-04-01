var Conducteur = require('../models/conducteur');

exports.ajoutercConducteur = function (req, res){
    var conducteur = new Conducteur(req.body);
    conducteur.save(function (err,todo) {
        if(err)
            res.send(err);
        else
            res.send(todo);
    })
}

exports.afficherConducteur = function (req, res){
    Conducteur.find(function (err,conducteurs) {
        if(err)
            res.send(err);
        if(!conducteurs)
            res.status(404).send();
        else
            res.json(conducteurs);

    })
}
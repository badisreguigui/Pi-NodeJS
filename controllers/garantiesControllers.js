var Garantie = require('../models/garantie');

exports.ajouterGarantie = function (req, res){
    var garantie = new Garantie(req.body);
    garantie.save(function (err,todo) {
        if(err)
            res.send(err);
        else
            res.send(todo);
    })
}

exports.afficherGarantie = function (req, res){
    Garantie.find(function (err,garanties) {
        if(err)
            res.send(err);
        if(!garanties)
            res.status(404).send();
        else
            res.json(garanties);

    })
}
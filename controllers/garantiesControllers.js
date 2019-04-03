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

exports.afficherGarantieParId = function (req,res){
    var id = req.params.id;
    Garantie.findById(id).exec(function(err,garantie){
        if(err)
            res.status(400).send(err);
        if(!garantie)
            res.status(404).send();
        else
            res.json(garantie);
    })   
}


exports.supprimerGarantieParId = function (req,res){
    var id = req.params.id;
    Garantie.findByIdAndRemove(id,function(err,garantie){
        if(err)
            res.status(400).send(err);
        else
            res.send();
    })   
}
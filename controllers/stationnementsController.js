var Stationnement = require('../models/stationnement');

exports.ajouterStationnement = function (req, res){
    var stationnement = new Stationnement(req.body);
    stationnement.save(function (err,todo) {
        if(err)
            res.send(err);
        else
            res.send(todo);
    })
}

exports.afficherStationnement = function (req, res) {
    Stationnement.find(function (err,stationnements) {
        if(err)
            res.send(err);
        if(!stationnements)
            res.status(404).send();
        else
            res.json(stationnements);

    })
}

exports.afficherStationnementParId = function (req,res){
    var id = req.params.id;
    Stationnement.findById(id).exec(function(err,stationnement){
        if(err)
            res.status(400).send(err);
        if(!stationnement)
            res.status(404).send();
        else
            res.json(stationnement);
    })   
}


exports.supprimerStationnementParId = function (req,res){
    var id = req.params.id;
    Stationnement.findByIdAndRemove(id,function(err,stationnement){
        if(err)
            res.status(400).send(err);
        else
            res.send();
    })   
}
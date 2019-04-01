var Voiture = require('../models/voiture');


exports.ajouterVoiture = function (req, res) {
    var voiture = new Voiture(req.body);
    voiture.save(function (err,todo) {
        if(err)
            res.send(err);
        else
            res.send(todo);
    })
}

exports.afficherVoiture = function (req, res) {
    Voiture.find(function (err,voitures) {
        if(err)
            res.send(err);
        if(!voitures)
            res.status(404).send();
        else
            res.json(voitures);

    })
}

exports.afficherVoitureParId = function (req,res){
    var id = req.params.id;
    Voiture.findById(id).exec(function(err,voiture){
        if(err)
            res.status(400).send(err);
        if(!voiture)
            res.status(404).send();
        else
            res.json(voiture);
    })   
}


exports.supprimerVoitureParId = function (req,res){
    var id = req.params.id;
    Voiture.findByIdAndRemove(id,function(err,voiture){
        if(err)
            res.status(400).send(err);
        else
            res.send();
    })   
}

var DossierInscription = require('../models/dossierInscription');

exports.ajouterDossierInscription = function (req, res){
    var dossierInscription = new DossierInscription(req.body);
    dossierInscription.save(function (err,todo) {
        if(err)
            res.send(err);
        else
            res.send(todo);
    })
}

exports.afficherDossierInscription = function (req, res){
    DossierInscription.find(function (err,dossierInscriptions) {
        if(err)
            res.send(err);
        if(!dossierInscriptions)
            res.status(404).send();
        else
            res.json(dossierInscriptions);

    })
}

exports.afficherDossierParId = function (req,res){
    var id = req.params.id;
    DossierInscription.findById(id).exec(function(err,dossierInscription){
        if(err)
            res.status(400).send(err);
        if(!dossierInscription)
            res.status(404).send();
        else
            res.json(dossierInscription);
    })   
}


exports.supprimerDossierParId = function (req,res){
    var id = req.params.id;
    DossierInscription.findByIdAndRemove(id,function(err,dossierInscription){
        if(err)
            res.status(400).send(err);
        else
            res.send();
    })   
}
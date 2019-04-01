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
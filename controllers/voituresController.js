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
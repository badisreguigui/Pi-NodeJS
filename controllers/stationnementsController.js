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
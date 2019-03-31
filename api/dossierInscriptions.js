var express = require('express');
var router = express.Router();
var DossierInscription = require('../models/dossierInscription');


router.post('/', function(req, res, next) {
    var dossierInscription = new DossierInscription(req.body);
    dossierInscription.save(function (err,todo) {
        if(err)
            res.send(err);
        else
            res.send(todo);
    })
});

router.get('/', function(req, res, next) {
    DossierInscription.find(function (err,dossierInscriptions) {
        if(err)
            res.send(err);
        if(!dossierInscriptions)
            res.status(404).send();
        else
            res.json(dossierInscriptions);

    })
});

module.exports = router;
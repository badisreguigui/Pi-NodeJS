var express = require('express');
var router = express.Router();
var Conducteur = require('../models/conducteur');


router.post('/', function(req, res, next) {
    var conducteur = new Conducteur(req.body);
    conducteur.save(function (err,todo) {
        if(err)
            res.send(err);
        else
            res.send(todo);
    })
});

router.get('/', function(req, res, next) {
    Conducteur.find(function (err,conducteurs) {
        if(err)
            res.send(err);
        if(!conducteurs)
            res.status(404).send();
        else
            res.json(conducteurs);

    })
});

module.exports = router;
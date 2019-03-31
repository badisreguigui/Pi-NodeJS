var express = require('express');
var router = express.Router();
var Voiture = require('../models/voiture');


router.post('/', function(req, res, next) {
    var voiture = new Voiture(req.body);
    voiture.save(function (err,todo) {
        if(err)
            res.send(err);
        else
            res.send(todo);
    })
});

router.get('/', function(req, res, next) {
    Voiture.find(function (err,voitures) {
        if(err)
            res.send(err);
        if(!voitures)
            res.status(404).send();
        else
            res.json(voitures);

    })
});

module.exports = router;
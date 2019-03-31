var express = require('express');
var router = express.Router();
var Stationnement = require('../models/stationnement');


router.post('/', function(req, res, next) {
    var stationnement = new Stationnement(req.body);
    stationnement.save(function (err,todo) {
        if(err)
            res.send(err);
        else
            res.send(todo);
    })
});

router.get('/', function(req, res, next) {
    Stationnement.find(function (err,stationnements) {
        if(err)
            res.send(err);
        if(!stationnements)
            res.status(404).send();
        else
            res.json(stationnements);

    })
});

module.exports = router;
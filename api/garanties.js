var express = require('express');
var router = express.Router();
var Garantie = require('../models/garantie');


router.post('/', function(req, res, next) {
    var garantie = new Garantie(req.body);
    garantie.save(function (err,todo) {
        if(err)
            res.send(err);
        else
            res.send(todo);
    })
});

router.get('/', function(req, res, next) {
    Garantie.find(function (err,garanties) {
        if(err)
            res.send(err);
        if(!garanties)
            res.status(404).send();
        else
            res.json(garanties);

    })
});

module.exports = router;
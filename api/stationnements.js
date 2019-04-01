var express = require('express');
var router = express.Router();
var Stationnement = require('../models/stationnement');
var stationnementController = require('../controllers/stationnementsController');


router.post('/',stationnementController.ajouterStationnement);
router.get('/',stationnementController.afficherStationnement);

module.exports = router;
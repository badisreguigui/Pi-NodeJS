var express = require('express');
var router = express.Router();
var Voiture = require('../models/voiture');
var voitureController = require('../controllers/voituresController');


router.post('/',voitureController.ajouterVoiture);
router.get('/',voitureController.afficherVoiture);

module.exports = router;
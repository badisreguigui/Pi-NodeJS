var express = require('express');
var router = express.Router();
var Voiture = require('../models/voiture');
var voitureController = require('../controllers/voituresController');


router.post('/',voitureController.ajouterVoiture);
router.get('/',voitureController.afficherVoiture);
router.get('/:id',voitureController.afficherVoitureParId);
router.delete('/:id',voitureController.supprimerVoitureParId);

module.exports = router;
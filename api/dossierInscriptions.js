var express = require('express');
var router = express.Router();
var DossierInscription = require('../models/dossierInscription');
var dossierInscriptionController = require('../controllers/dossierInscriptionsController');


router.post('/',dossierInscriptionController.ajouterDossierInscription);
router.get('/',dossierInscriptionController.afficherDossierInscription);

module.exports = router;
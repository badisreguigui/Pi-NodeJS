var express = require('express');
var router = express.Router();
var DossierInscription = require('../models/dossierInscription');
var dossierInscriptionController = require('../controllers/dossierInscriptionsController');


router.post('/',dossierInscriptionController.ajouterDossierInscription);
router.get('/',dossierInscriptionController.afficherDossierInscription);
router.get('/:id',dossierInscriptionController.afficherDossierParId);
router.delete('/:id',dossierInscriptionController.supprimerDossierParId);
router.get('/conducteur/:id',dossierInscriptionController.afficherDossierParIdConducteur);

module.exports = router;
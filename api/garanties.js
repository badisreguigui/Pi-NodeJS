var express = require('express');
var router = express.Router();
var garantieController = require('../controllers/garantiesControllers');

router.post('/',garantieController.ajouterGarantie);
router.get('/',garantieController.afficherGarantie);
router.get('/:id',garantieController.afficherGarantieParId);
router.delete('/:id',garantieController.supprimerGarantieParId);

module.exports = router;
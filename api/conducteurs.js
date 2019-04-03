var express = require('express');
var router = express.Router();
var conducteurController = require('../controllers/conducteursController');


router.post('/',conducteurController.ajoutercConducteur);
router.get('/',conducteurController.afficherConducteur);
router.get('/:id',conducteurController.afficherConducteurParId);
router.delete('/:id',conducteurController.supprimerConducteurParId);

module.exports = router;
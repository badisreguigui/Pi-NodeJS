var express = require('express');
var router = express.Router();
var stationnementController = require('../controllers/stationnementsController');


router.post('/',stationnementController.ajouterStationnement);
router.get('/',stationnementController.afficherStationnement);
router.get('/:id',stationnementController.afficherStationnementParId);
router.delete('/:id',stationnementController.supprimerStationnementParId);

module.exports = router;
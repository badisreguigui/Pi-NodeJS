var express = require('express');
var router = express.Router();
var Garantie = require('../models/garantie');
var garantieController = require('../controllers/garantiesControllers');

router.post('/',garantieController.ajouterGarantie);
router.get('/',garantieController.afficherGarantie);

module.exports = router;
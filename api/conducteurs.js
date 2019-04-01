var express = require('express');
var router = express.Router();
var Conducteur = require('../models/conducteur');
var conducteurController = require('../controllers/conducteursController');


router.post('/',conducteurController.ajoutercConducteur);
router.get('/',conducteurController.afficherConducteur);

module.exports = router;
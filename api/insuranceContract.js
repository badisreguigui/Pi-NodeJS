var express = require('express');
var router = express.Router();
var insuranceContractController = require('../controllers/insuranceContractController');

router.post('/',insuranceContractController.addInsuranceContract);


module.exports = router;
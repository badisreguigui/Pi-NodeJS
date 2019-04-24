var express = require('express');
var router = express.Router();
var insuranceContractController = require('../controllers/insuranceContractController');

router.post('/',insuranceContractController.addInsuranceContract);


router.get('/getAll',insuranceContractController.afficherInsuranceContracts);

router.post('/verifyPolicy',insuranceContractController.verifyPolicy);

router.post('/checkReason',insuranceContractController.verifyReason);

router.get('/getGarantiesFromInsuranceContracts',insuranceContractController.getGarantiesFromInsuranceContracts);

module.exports = router;
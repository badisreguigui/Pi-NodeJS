var express = require('express');
var router = express.Router();
var paymensMethodsController = require('../controllers/paymentsMethodsController'); 

/*router.get('/stripe/:idclient/:months',paymensMethodsController.gotostripe)//mch lezem tintegreha tawa
router.post('/charge/:idclient/:months',paymensMethodsController.paywithStripe)//mch lezem tintegreha tawa*/
router.get('/buy/:idclient/:months',paymensMethodsController.paywithPaypal)
router.get('/success',paymensMethodsController.success)
router.get('/err',paymensMethodsController.error)

module.exports = router;

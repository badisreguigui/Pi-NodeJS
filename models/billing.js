
var express = require('express');
var router = express.Router();
var billingController = require('../controllers/billingController'); 


router.get('/home',billingController.home);
router.get('/getClientPaymentEtat/:id',billingController.getClientPaymentEtat);
router.get('/checkPayment/:id', billingController.checkPayment)
router.get('/totalRetourne/:id/:idClaim', billingController.getTotalEstimated)
/*router.post('/addDemande', (req, res) => {
   var demande = new Demandes(req.body)
   demande.save(function(err,demande){
       if(err)
            res.send(err)
       else
            res.send(demande)
   })
});

router.post('/addClient', (req, res) => {
    var client = new Clients(req.body)
    client.save(function(err,client){
        if(err)
             res.send(err)
        else
             res.send(client)
    })
 });*/




module.exports = router;